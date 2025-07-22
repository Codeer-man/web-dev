import express, { NextFunction } from "express";
import bodyParser from "body-parser";

import todoRoute from "./routes/todo";

const app = express();

app.use(bodyParser.json());
app.use("/todo", todoRoute);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    res.status(200).json({ message: err.message });
  }
);
const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
