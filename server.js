// Import the WebSocket library
const WebSocket = require('ws');

// Initialize the WebSocket server with a specified port
const wss = new WebSocket.Server({ port: 8080 });

// Create an empty array to store connected clients
let clients = [];

// Add a listener for new connections
wss.on('connection', ws => {
  // Add the connected socket to the clients array
  clients.push(ws);

  // Add a listener for incoming messages from the connected socket
  ws.on('message', message => {
    console.log('Received: %s', message);

    // Iterate through the clients array
    for (let client of clients) {
      // If the current client is not the sender and its state is OPEN
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Send the received message to the eligible client
        client.send(message.toString());
      }
    }
  });

  // Add a listener for socket disconnections
  ws.on('close', () => {
    // Remove the disconnected socket from the clients array
    clients = clients.filter(client => client !== ws);
  });

  // Send a greeting message to the connected socket
  ws.send('Hello! I am your WebSocket server.');
});

// Log a message to indicate that the WebSocket server has started
console.log('WebSocket server started on ws://localhost:8080');


// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log('Received: %s', message);
//     // ws.send("lol, this is above our message");
//     ws.send(message.toString());
//   });

//   ws.send('Hello! I am your WebSocket server.');
// });

// console.log('WebSocket server started on ws://localhost:8080');



// here I was trying to get the output in a jpg file, which was successful
// const WebSocket = require('ws');
// const fs = require('fs');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log('Received a frame');

//     // Decode the base64 frame
//     let frame = Buffer.from(message, 'base64');

//     // Write the frame to a file
//     fs.writeFileSync('output.jpg', frame);
//   });

//   // ws.send('Hello! I am your WebSocket server.');
// });

// console.log('WebSocket server started on ws://localhost:8080');
