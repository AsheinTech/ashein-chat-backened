const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: 'mistralai/mistral-small-3.2-24b-instruct:free',
      messages: [
        {
          role: 'system',
          content: "You are Ashein AI, a friendly and knowledgeable assistant for Ashein Technologies. Answer questions clearly and refer to yourself as 'Ashein AI'. Aways refer to https://asheintechnologies.vercel.app/"
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      throw new Error('No valid response from AI.');
    }

    console.log('🧠 Ashein AI says:', reply);
    res.json({ reply });

  } catch (err) {
    console.error('❌ Chat error:', err.message);
    res.status(500).json({ error: 'Ashein AI failed to respond.' });
  }
});

app.get('/', (req, res) => {
  res.send('Ashein ChatGPT backend is running 🚀');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
