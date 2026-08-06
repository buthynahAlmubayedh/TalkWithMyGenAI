const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/chat', chatController.sendMessage);
router.get('/models', chatController.getModels);
router.get('/health', chatController.healthCheck);

module.exports = router;