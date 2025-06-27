const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Use node-fetch for OpenRouter API

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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
        'HTTP-Referer': 'https://asheintechnologies.vercel.app', // Optional
        'X-Title': 'Ashein AI Assistant'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [
          {
            role: 'system',
            content: "You are Ashein AI, the smart and friendly assistant for Ashein Technologies. Always refer to yourself as Ashein AI and provide clear, professional help."
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log('🧠 OpenRouter response:', data);

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error('No valid AI reply.');
    }

    res.json({ reply });

  } catch (err) {
    console.error('❌ Chat error:', err.message);
    res.status(500).json({ error: 'Ashein AI failed to respond.' });
  }
});

app.get('/', (req, res) => {
  res.send('🌐 Ashein AI backend is running via OpenRouter');
});

app.listen(port, () => {
  console.log(`🚀 Ashein AI server running on port ${port}`);
});
    
