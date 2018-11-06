const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8080 });
const clients = [];
let whoseTurnId;


wss.on('connection', (ws => {
  // const id = Math.random();
  // client[id] = ws;
  clients.push(ws);

  ws.on('message', message => {
    console.log(message);
    const dataFromClient = strToObj(message);
    if (dataFromClient && dataFromClient.id !== whoseTurnId) {
      whoseTurnId = dataFromClient.id;
      clients.forEach(client => {
        client.send(message);
      });
    } else {
      ws.send('Not your turn');
    }
    console.log(`received: ${message}`);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });

  ws.send("Hello Client");
}));

const strToObj = str => {
  let obj = {};
  if(str||typeof str ==='string'){
      let objStr = str.match(/\{(.)+\}/g);
      eval("obj ="+objStr);
  }
  return obj;
}
