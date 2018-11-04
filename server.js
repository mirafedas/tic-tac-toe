const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8080 });
const clients = [];

wss.on('connection', (ws => {
  // const id = Math.random();
  // client[id] = ws;
  clients.push(ws);

  ws.on('message', message => {
    console.log(clients.length);
    clients.forEach(client => {
      client.send(message);
    });
    console.log(`received: ${message}`);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });

  ws.send("Hello Client");
}));
console.log('Max');
