const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("wlc to the Home Page");
  } else if (url === "/projects") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("project page");
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end("Not Found");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
