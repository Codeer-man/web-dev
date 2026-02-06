import { WebSocketServer, WebSocket } from "ws";

//create it's own internal http server for handshake
const wss = new WebSocketServer({ port: 8080 });

//connection Event
//! socket = contains the indivial connection to one client
//! request = contains header such as cookies,ip address and more from the upgrade request
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress; //autofills  ip address and tells what u are retriving

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });

    // types of readtState
    // 0: connecting
    // 1: open (the only state where you can safely use  .send())
    // 2: closing
    // 3: closed
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        // 1
        client.send(`Server broadCast ${message}`);
    });
  });

  socket.on("error", (err) => {
    console.error(`Error : ${err.message}: ${ip}`);
  });

  socket.on("close", () => {
    console.log("client disconnected");
  });
});

console.log("Websocket server is live on ws://localhost:8080");
