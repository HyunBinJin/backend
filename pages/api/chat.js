import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "POST 요청만 허용됩니다." });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: "prompt가 필요합니다." });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ text: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message || "오류가 발생했습니다." });
  }
}
