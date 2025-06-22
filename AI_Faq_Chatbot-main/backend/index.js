const express = require('express');
const cors = require('cors');
const faqs = require('./faqs.json');
const { askOpenAI } = require('./openai');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    const match = faqs.find(faq => message.toLowerCase().includes(faq.question.toLowerCase()));
    if (match) {
        return res.json({ reply: match.answer });
    }
    try {
        const reply = await askOpenAI(message);
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ reply: "Error generating response." });
    }
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
