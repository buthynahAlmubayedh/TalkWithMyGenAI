const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
  
    // Ollama not running
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Ollama is not running.',
        hint: 'Make sure the ollama container is up: docker-compose up ollama',
      });
    }
  
    // Ollama timeout
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'Ollama took too long to respond.',
        hint: 'Try a smaller/faster model in your .env',
      });
    }
  
    // Ollama 404 - wrong model name
    if (err.response?.status === 404) {
      return res.status(404).json({
        error: 'Model not found.',
        hint: 'Run "ollama list" to see available models and update OLLAMA_MODEL in .env',
      });
    }
  
    // Generic error
    res.status(500).json({
      error: 'Something went wrong.',
      message: err.message,
    });
  };
  
  module.exports = errorHandler;