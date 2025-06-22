const OpenAI = require("openai");
require("dotenv").config();

console.log("Loaded Key:", process.env.OPENAI_API_KEY); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


async function test() {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Tell me a joke" }],
    max_tokens: 50
  });

  console.log(res.choices[0].message.content);
}

test();
