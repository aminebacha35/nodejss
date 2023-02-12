const messageList = document.getElementById('post-list');
const chatStatus = document.getElementById('post-status');

function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageList.appendChild(messageElement);
}

// Connexion du WebSocket

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws');

  ws.onerror = (error) => {
    console.log('Error', error);
  };

  ws.onmessage = (event) => {
    console.log('Message from server', event.data);
    addMessage(event.data);
  };
}

connect()

document.querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#post-input');
    addMessage(input.value);
    ws.send(input.value);
    input.value = '';
  });


