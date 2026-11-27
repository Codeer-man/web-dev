import { createProducer, publicJsonSafe, topic } from "shared";

let producer: Awaited<ReturnType<typeof createProducer>> | null = null;

export async function initKafka() {
  producer = await createProducer("task-service");
}

export async function publishTaskEvent(taskId: string, userId: string) {
  await publicJsonSafe(
    producer,
    topic.TASK_EVENT,
    {
      eventType: "task.created",
      taskId,
      userId,
      message: "Task created successfully",
    },
    taskId,
  );
}
