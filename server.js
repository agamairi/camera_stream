const WebSocket = require('ws');

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Set up connection event listener
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // Configure the WebSocket for handling binary data
  ws.binaryType = 'arraybuffer'; // Ensure we're working with ArrayBuffer data

  // Set up message event listener for this connection
  ws.on('message', function incoming(message) {
    if (typeof message === 'string') {
      // Handle text messages as before
      console.log('Received text message: %s', message);
      ws.send('Echo: ' + message); // Echoing text messages back to the sender
    } else if (message instanceof Buffer) {
      // Handle binary data
      console.log('Received binary message');
      // Broadcast the binary data to all connected clients except the sender
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message); // Send the binary data
        }
      });
    }
  });

  // Send a welcome message to the newly connected client
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://192.168.50.99:8080');

