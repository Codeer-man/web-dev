import { Router } from "express";
import { validate } from "shared";
import { taskSchema } from "../schema/task.schema";
import * as taskController from "../controller/task.controller";

const taskRoute = Router();

taskRoute.post("/", validate(taskSchema), taskController.createTask);
taskRoute.get("/", taskController.listTasks);
taskRoute.get("/:id", taskController.getSingleTask);
taskRoute.delete("/:id", taskController.deleteSingleTask);

export default taskRoute;
