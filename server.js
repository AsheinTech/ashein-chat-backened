const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get('/', (req, res) => {
  res.send('Ashein ChatGPT backend is running');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
