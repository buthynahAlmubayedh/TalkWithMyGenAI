require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRouter = require('./routes/chat');

const expressLayouts = require("express-ejs-layouts");



const app = express();
const PORT = process.env.PORT || 5000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || "llama3";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout");



// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Ollama Chat',
    model: process.env.OLLAMA_MODEL,
  });
});

app.use('/api', chatRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});