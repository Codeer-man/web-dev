const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end("Home page");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
