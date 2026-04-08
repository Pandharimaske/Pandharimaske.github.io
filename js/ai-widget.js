/**
 * AI Portfolio Widget — Neural Command Center Edition
 * A simulated agentic AI interface for recruiter interactions.
 */
(function() {
  const responses = {
    "default": "Query recognized. I am an autonomous shard of Pandhari's neural core. I can provide telemetry on his tech stack (LLMs, RAG, MLOps), competitive metrics (LeetCode), or research publications.",
    "stack": "Neural Stack: Specialized in Agentic Flow (LangGraph), Latent Retrieval (Pinecone, ChromaDB), and Infrastructure (Docker, MLOps). Primary Logic: Python & C++.",
    "rag": "Handshake established. He has architected production-grade RAG systems, specifically a Multi-Agent Coffee Shop Logic Engine and a Semantic Latent Discovery tool for Literature. Both feature dual-memory persistence.",
    "lc": "Telemetry data: 700+ algorithmic nodes resolved on LeetCode. Peak contest rating established at 1647. High proficiency in Graph Theory and Dynamic Programming optimizations.",
    "contact": "Comm-link initialized. Reach the host at pandharinath1437@gmail.com or synchronize via LinkedIn/GitHub nodes.",
    "hi": "System active. Neural handshake successful. How can I assist your inquiry into Pandhari's capabilities?",
    "hello": "System active. Neural handshake successful. How can I assist your inquiry into Pandhari's capabilities?"
  };

  const widgetHTML = `
    <div id="ai-widget-container">
      <button id="ai-widget-toggle" title="Chat with AI Agent">
        <i class="fas fa-brain"></i>
        <span class="ai-status-pulse"></span>
      </button>
      <div id="ai-chat-window">
        <div class="ai-chat-header">
          <div class="ai-header-info">
            <span class="ai-dot"></span>
            <span class="ai-title">NEURAL_AGENT_v4.2</span>
          </div>
          <button id="ai-chat-close"><i class="fas fa-times"></i></button>
        </div>
        <div id="ai-chat-messages">
          <div class="ai-msg bot">
            <div class="ai-msg-content">System active. I am an interface for Pandhari's neural core. Initialize inquiry.</div>
          </div>
        </div>
        <div class="ai-chat-input-area">
          <input type="text" id="ai-chat-input" placeholder="Query the core..." autocomplete="off">
          <button id="ai-chat-send"><i class="fas fa-terminal"></i></button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHTML);

  const toggle = document.getElementById('ai-widget-toggle');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close');
  const input = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-chat-send');
  const messagesContainer = document.getElementById('ai-chat-messages');

  toggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  function addMessage(text, isBot = false) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${isBot ? 'bot' : 'user'}`;
    msg.innerHTML = `<div class="ai-msg-content">${text}</div>`;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function simulateTyping(text) {
    const msg = document.createElement('div');
    msg.className = 'ai-msg bot';
    const content = document.createElement('div');
    content.className = 'ai-msg-content typing';
    msg.appendChild(content);
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    let i = 0;
    const interval = setInterval(() => {
      content.textContent += text[i];
      i++;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      if (i >= text.length) {
        clearInterval(interval);
        content.classList.remove('typing');
      }
    }, 15);
  }

  function handleInput() {
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    addMessage(input.value, false);
    input.value = '';

    setTimeout(() => {
      let response = responses.default;
      if (text.includes('stack') || text.includes('skill') || text.includes('tech')) response = responses.stack;
      else if (text.includes('rag') || text.includes('project') || text.includes('agent')) response = responses.rag;
      else if (text.includes('leetcode') || text.includes('lc') || text.includes('dsa')) response = responses.lc;
      else if (text.includes('contact') || text.includes('hire') || text.includes('reach')) response = responses.contact;
      else if (text.includes('hi') || text.includes('hello')) response = responses.hi;

      simulateTyping(response);
    }, 400);
  }

  sendBtn.addEventListener('click', handleInput);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleInput();
  });
})();
