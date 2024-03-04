const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received: %s', message);
    // ws.send("lol, this is above our message");
    ws.send(message.toString());
  });

  ws.send('Hello! I am your WebSocket server.');
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
