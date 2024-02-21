const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received: %s', message);
    ws.send(`Echo: ${message}`);
  });

  ws.send('Hello! I am your WebSocket server.');
});

console.log('WebSocket server started on ws://localhost:8080');
