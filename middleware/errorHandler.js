const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
  
   
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'Ollama is not running.',
       
      });
    }
  
 
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'Ollama took too long to respond.',
        
      });
    }
  

    if (err.response?.status === 404) {
      return res.status(404).json({
        error: 'Model not found.',
      
      });
    }
  
    
    res.status(500).json({
      error: 'Something went wrong.',
      message: err.message,
    });
  };
  
  module.exports = errorHandler;
