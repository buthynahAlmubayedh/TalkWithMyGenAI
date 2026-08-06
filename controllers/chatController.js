const ollamaService = require('../services/ollamaService');

// POST /api/chat
const sendMessage = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await ollamaService.chat(message, history);
    res.json({ reply });

  } catch (err) {
    next(err); // pass to global error handler
  }
};

// GET /api/models
const getModels = async (req, res, next) => {
  try {
    const models = await ollamaService.getModels();
    res.json(models);
  } catch (err) {
    next(err);
  }
};

// GET /api/health
const healthCheck = async (req, res, next) => {
  try {
    await ollamaService.healthCheck();
    res.json({ status: 'ok', ollama: 'reachable' });
  } catch (err) {
    res.status(503).json({ status: 'error', ollama: 'unreachable' });
  }
};

module.exports = { sendMessage, getModels, healthCheck };