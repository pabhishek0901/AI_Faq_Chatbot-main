const OpenAI = require("openai");
require("dotenv").config();

console.log("✅ Loaded API Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", 
});

async function askOpenAI(message) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", 
      messages: [{ role: "user", content: message }],
      max_tokens: 100
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("🛑 GPT API Error:", error.message);
    if (error.response) {
      console.error("🧾 GPT Error Details:", error.response.status, error.response.data);
    }
    throw error;
  }
}

module.exports = { askOpenAI };
