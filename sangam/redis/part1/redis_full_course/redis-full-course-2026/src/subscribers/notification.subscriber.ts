import dotenv from "dotenv";
import { createClient } from "redis";
import { redisClient } from "../redis/client";

const notification_channel = "notifications";
const redisUrl = process.env.REDIS_URL || "redis://localhost:6380";

export interface NotificationsPayload {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export async function publishNotification(
  notification: NotificationsPayload,
): Promise<void> {
  await redisClient.publish(notification_channel, JSON.stringify(notification));
}

const subcriberClient = createClient({ url: redisUrl });

subcriberClient.on("error", (err) => {
  console.error("subs redis error", err);
});

async function startNotificationSubscriber() {
  await subcriberClient.connect();

  await subcriberClient.subscribe(notification_channel, (message) => {
    try {
      const notification = JSON.parse(message) as NotificationsPayload;

      console.log("new noti received");
      console.log("title", notification.title);
      console.log("message", notification.message);
      console.log("createdAt", notification.createdAt);
    } catch {
      console.log("new noti received (new)", message);
    }
  });
}

startNotificationSubscriber().catch((err) => {
  console.error("failed to start noti", err);
  process.exit(1);
});
