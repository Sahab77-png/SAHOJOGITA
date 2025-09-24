require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const app = express();
app.use(cors());
app.use(express.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post('/moderate', async (req, res) => {
  const { input } = req.body;
  try {
    const result = await openai.moderations.create({ input });
    const flagged = result.results[0].flagged;
    res.json({ flagged });
  } catch (error) {
    console.error('Moderation error:', error);
    res.status(500).json({ flagged: false });
  }
});
app.listen(5000, () => console.log('Moderation server running on port 5000'));
