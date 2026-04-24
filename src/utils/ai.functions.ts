import { createServerFn } from "@tanstack/react-start";

type GwMessage = {
  role: "system" | "user" | "assistant";
  content:
    | string
    | Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
      >;
};

type AiInput = {
  system: string;
  messages: GwMessage[];
  json?: boolean;
  model?: string;
};

export const callAi = createServerFn({ method: "POST" })
  .inputValidator((input: AiInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "LOVABLE_API_KEY not configured" };
    }

    const body: Record<string, unknown> = {
      model: data.model || "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: data.system },
        ...data.messages,
      ],
    };
    if (data.json) {
      body.response_format = { type: "json_object" };
    }

    try {
      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        if (res.status === 429) {
          return {
            ok: false as const,
            error: "Rate limit reached. Please wait a moment and try again.",
          };
        }
        if (res.status === 402) {
          return {
            ok: false as const,
            error:
              "AI credits exhausted. Add credits in Settings → Workspace → Usage.",
          };
        }
        const txt = await res.text();
        console.error("AI gateway error:", res.status, txt);
        return { ok: false as const, error: `AI gateway error (${res.status})` };
      }

      const json = await res.json();
      const text: string = json?.choices?.[0]?.message?.content ?? "";
      return { ok: true as const, text };
    } catch (e) {
      console.error("AI request failed:", e);
      return {
        ok: false as const,
        error: e instanceof Error ? e.message : "AI request failed",
      };
    }
  });
