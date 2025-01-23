const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req, res);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("hello node js form module");
});
const port = 5000;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
 
});
