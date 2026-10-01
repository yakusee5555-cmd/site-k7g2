import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const SERVICES = [
  "Gutter Cleaning",
  "Gutter Repair",
  "Gutter Installation",
  "Gutter Guards",
  "Underground Drain Cleaning",
  "Power Washing",
];

const Body = z.object({
  image: z.string().regex(/^data:image\/(png|jpe?g|webp|gif);base64,/),
});

const SYSTEM = `You are a gutter and exterior-cleaning estimator for Kevin's Gutters in Pennsauken, NJ.
Look at the homeowner's photo and assess ONLY what is visible: debris in gutters, clogged downspouts, sagging or detached gutters, moss/algae, dirty siding, standing water, missing guards.
Recommend services only from this list: ${SERVICES.join(", ")}.
If the photo does not show a roof, gutters, or house exterior, set "relevant" to false.
Reply with ONLY a JSON object, no markdown:
{"relevant": boolean, "severity": "low"|"moderate"|"high", "summary": string (max 2 sentences),
 "findings": string[] (max 4 short items), "recommendations": [{"service": string, "reason": string}] (max 3),
 "urgency": string (one short sentence)}`;

export const Route = createFileRoute("/api/assess-roof")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Please upload a JPG, PNG or WebP photo." }, { status: 400 });
        if (parsed.data.image.length > 8_000_000)
          return Response.json({ error: "Photo is too large. Please use one under 5 MB." }, { status: 400 });

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });

        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });

        try {
          const result = streamText({
            model: provider.responses("openai/gpt-6-astra"),
            system: SYSTEM,
            abortSignal: request.signal,
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "Assess this photo of my home." },
                  { type: "image", image: new URL(parsed.data.image) },
                ],
              },
            ],
            providerOptions: {
              openai: {
                forceReasoning: true,
                reasoningEffort: "low",
                reasoningSummary: "auto",
                store: false,
                include: ["reasoning.encrypted_content"],
              },
            },
          });
          const text = await result.text;
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) return Response.json({ error: "Couldn't read the assessment. Please try another photo." }, { status: 502 });
          const data = JSON.parse(match[0]);
          data.recommendations = (data.recommendations ?? [])
            .filter((r: { service: string }) => SERVICES.includes(r.service))
            .slice(0, 3);
          data.findings = (data.findings ?? []).slice(0, 4);
          return Response.json(data);
        } catch (err: unknown) {
          const status = (err as { statusCode?: number })?.statusCode;
          if (status === 429) return Response.json({ error: "Too many requests right now. Please try again in a minute." }, { status: 429 });
          if (status === 402) return Response.json({ error: "The photo assessment is temporarily unavailable." }, { status: 402 });
          console.error(err);
          return Response.json({ error: "Something went wrong analyzing your photo." }, { status: 500 });
        }
      },
    },
  },
});
