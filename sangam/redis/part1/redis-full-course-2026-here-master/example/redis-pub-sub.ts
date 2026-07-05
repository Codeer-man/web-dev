// publish/ subscribe
// publiser sends a message
// subscriber listens and receives the messages
// channel is the topic name both sides use

import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6380";

const channel = "demo:notifications";

async function run() {
  // needs two clients
  // one client will be to publish and second one to subscribe
  const publiser = createClient({ url: redisUrl });
  const subscriber = createClient({ url: redisUrl });

  await publiser.connect();
  await subscriber.connect();

  console.log("publiser connected");
  console.log("subscriber connected");
  console.log("ping ->", await publiser.ping());
  console.log("subscriber listens");

  // subcriber must be active before publish

  await subscriber.subscribe(channel, (message) => {
    const data = JSON.parse(message);
    console.log("subscriber received");
    console.log("title", data.title);
    console.log("message", data.message);
  });

  console.log("subscribed to channel", channel);

  console.log("publiser is now sending event");

  const event = {
    title: "redis course",
    message: "pub/sub demo",
  };

  const receivers = await publiser.publish(channel, JSON.stringify(event));
  console.log("publisehed event");
  console.log("active subscribers", receivers);

  await new Promise((resolve) => setTimeout(resolve, 300));

  await subscriber.unsubscribe(channel);
  await subscriber.quit();
  await publiser.quit();

  console.log("pub/sub demo done");
}

run().catch((error) => {
  console.error("pub/sub demo failed:", error);
  process.exit(1);
});
