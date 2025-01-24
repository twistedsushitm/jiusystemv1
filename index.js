import { Ollama } from 'ollama';
import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json(), cors());

const ollamaClient = new Ollama();

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  if(!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await ollamaClient.generate({
      model: 'llama3.2',
      prompt,
    });
    res.json(response);
  } catch(error) {
    console.error("Error: ", error.message);
    res.status(500).json({ error: "Failed to generate response"});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})