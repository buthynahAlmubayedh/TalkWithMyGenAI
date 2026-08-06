const axios = require('axios');
const config = require('../config/env');

// Send a chat message to Ollama
const chat = async (message, history = []) => {
  const messages = [
    ...history,
    { role: 'user', content: message },
  ];

  const response = await axios.post(
    `${config.ollama.baseUrl}/api/chat`,
    {
      model: config.ollama.model,
      messages,
      stream: false,
    },
    { timeout: config.ollama.timeout }
  );

  return response.data.message?.content || 'No response from model.';
};

// Get all available models from Ollama
const getModels = async () => {
  const response = await axios.get(`${config.ollama.baseUrl}/api/tags`);
  return response.data;
};

// Check if Ollama is reachable
const healthCheck = async () => {
  const response = await axios.get(`${config.ollama.baseUrl}`);
  return response.status === 200;
};

module.exports = { chat, getModels, healthCheck };