import drawInSquare from './main.js';

var ws = new WebSocket("ws://127.0.0.1:8080");

ws.onopen = function (event) {
  console.log('Connection is open ...');
  ws.send("Hello Server");
};

ws.onerror = function (err) {
  console.log('err: ', err);
}

ws.onmessage = function (event) {
  const receivedData = strToObj(event.data);
  if (receivedData) {
    drawInSquare(receivedData.className);
  }

  console.log(event.data, 'DATA');
};

ws.onclose = function() {
  console.log("Connection is closed...");
}

export function playerTurn(data) {
  ws.send(data);
}

const strToObj = str => {
  let obj = {};
  if(str||typeof str ==='string'){
      let objStr = str.match(/\{(.)+\}/g);
      eval("obj ="+objStr);
  }
  return obj;
}
