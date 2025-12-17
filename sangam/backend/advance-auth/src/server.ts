import app from "./app";
import { connectTODB } from "./config/db";
import http from "http"; //node:http

const port = process.env.PORT;

async function startServer() {
  await connectTODB();

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is listening to server ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Error while connecting the server");
  process.exit(1);
});
