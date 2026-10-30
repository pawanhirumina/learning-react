import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: [".env.local", ".env"], quiet: true });

const app = express();
const PORT = process.env.PORT || 3001;
const AI_API_URL = (process.env.AI_API_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const AI_ENDPOINT = AI_API_URL.endsWith("/chat/completions")
  ? AI_API_URL
  : `${AI_API_URL}/chat/completions`;
const AI_MODEL =
  process.env.AI_MODEL ||
  (AI_API_URL.includes("groq.com") ? "openai/gpt-oss-120b" : "gpt-4o-mini");

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/ask", async (req, res) => {
  const query = typeof req.body?.query === "string" ? req.body.query.trim() : "";

  if (!query) {
    return res.status(400).json({ error: "query is required" });
  }

  if (!process.env.AI_API_KEY) {
    return res.status(500).json({ error: "AI_API_KEY is not configured" });
  }

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant on a personal portfolio FAQ page. Answer clearly and concisely in a few sentences.",
          },
          { role: "user", content: query },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "The AI request failed",
      });
    }

    const answer = data.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(502).json({ error: "The AI returned an empty answer" });
    }

    return res.json({ answer });
  } catch {
    return res.status(502).json({ error: "Could not reach the AI API" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
