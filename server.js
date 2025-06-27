const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Make sure this is installed

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({
  origin: 'https://asheintechnologies.vercel.app'
}));

app.use(bodyParser.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://asheintechnologies.vercel.app',
        'X-Title': 'Ashein AI Chatbot'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    console.log('🧠 OpenRouter AI response:', data);

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      console.error('❌ Invalid OpenRouter response:', data);
      res.status(500).json({ reply: 'Sorry, I couldn’t get a response from the AI.' });
    }
  } catch (err) {
    console.error('❌ Chat error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Ashein AI Chatbot running on port ${port}`);
})
