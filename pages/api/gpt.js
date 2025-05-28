// pages/api/gpt.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error('GPT Error:', err);
    res.status(500).json({ error: 'GPT 응답 오류' });
  }
}
