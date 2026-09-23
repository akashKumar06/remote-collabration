import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateProjectDetails = async (req, res) => {
  try {
    const { idea } = req.body;

    const prompt = `
        You are an expert product manager AI.

        Convert this idea into a full project structure with:
        Idea: "${idea}"
    `;

    const stream = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        res.write(text); // stream the text to client
      }
    }

    res.end(); // end the stream
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Groq API call failed" });
  }
};
