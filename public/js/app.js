// to the frontend to fetch requests
// Chat history for context, history variable gives conversation memory only while the current page is open. Once the page is refreshed or closed.
let history = []; // will store the user and it message, and the assistent aka ollama and his response

const messagesEl = document.getElementById('messages');
const inputEl    = document.getElementById('user-input');
const sendBtn    = document.getElementById('send-btn');
const statusEl   = document.getElementById('status');

// Auto-resize textarea
inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 160) + 'px';
});

// Send on Enter (Shift+Enter = new line)
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const message = inputEl.value.trim();
  if (!message) return;

  // Clear welcome message on first send
  const welcome = messagesEl.querySelector('.welcome');
  if (welcome) welcome.remove();

  // Show user message
  appendMessage('user', message);

  // Reset input
  inputEl.value = '';
  inputEl.style.height = 'auto';
  setLoading(true);

  // Show typing indicator
  const typingId = showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json();
    removeTyping(typingId);

    if (!res.ok) {
      showError(data.error || 'Something went wrong.');
      return;
    }

    // Add to history
    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: data.reply });

    appendMessage('ai', data.reply);

  } catch (err) {
    removeTyping(typingId);
    showError('Could not reach the server. Is it running?');
  } finally {
    setLoading(false);
  }
}

function appendMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `message ${role}`;

  const label = document.createElement('div');
  label.className = 'msg-label';
  label.textContent = role === 'user' ? 'You' : 'Ollama';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  wrap.appendChild(label);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollToBottom();
}

function showTyping() {
  const id = 'typing-' + Date.now();
  const wrap = document.createElement('div');
  wrap.className = 'message ai';
  wrap.id = id;

  const label = document.createElement('div');
  label.className = 'msg-label';
  label.textContent = 'Ollama';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble typing-dots';
  bubble.innerHTML = '<span></span><span></span><span></span>';

  wrap.appendChild(label);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  scrollToBottom();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function showError(msg) {
  const el = document.createElement('div');
  el.className = 'error-bubble';
  el.textContent = '⚠ ' + msg;
  messagesEl.appendChild(el);
  scrollToBottom();
}

function setLoading(loading) {
  sendBtn.disabled = loading;
  statusEl.textContent = loading ? 'Thinking...' : 'Ready';
  statusEl.className   = loading ? 'status thinking' : 'status';
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function newChat() {
  history = [];
  messagesEl.innerHTML = '<div class="welcome"><p>Ask me anything.</p></div>';
  inputEl.focus();
}