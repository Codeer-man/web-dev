import {
  createTask as createTaskInput,
  createTask,
} from "../schema/task.schema";
import * as taskRepo from "../repository/task.repo";

import { AppError } from "shared";
import { publishTaskEvent } from "../kafka";

export async function createTask(input: createTaskInput, userId: string) {
  const newlyCreatedTask = await taskRepo.createTask({
    title: input.title,
    createdBy: userId,
  });

  // publish one event here saying ok now we just created one task
  await publishTaskEvent(newlyCreatedTask.id, userId);

  return newlyCreatedTask;
}

export async function listTasks(userId: string, role: string) {
  if (!userId || !role) {
    throw new AppError(401, "Missing user identity");
  }

  const tasks = await taskRepo.listTasks({ userId, role });

  return tasks;
}

export async function getSingleTask(id: string, userId: string, role: string) {
  const task = await taskRepo.findSingleTaskById(id);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  if (role !== "ADMIN" && task.created_by !== userId) {
    throw new AppError(403, "forbidden");
  }

  return task;
}

export async function deleteSingleTask(id: string, role: string) {
  if (role !== "ADMIN") {
    throw new AppError(403, "Forbidden");
  }

  const task = await taskRepo.findSingleTaskById(id);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  await taskRepo.deleteSingleTaskById(id);

  return { id };
}
