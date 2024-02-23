const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received a frame');

    // Broadcast the frame to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('WebSocket server started on ws://localhost:8080');


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
