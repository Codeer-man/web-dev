import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL!;

export const redisClient = createClient({ url: redisUrl });

redisClient.on("connect", () => {
  console.log("redis client connection established");
});

redisClient.on("error", (error) => {
  console.error("Redis client error", error);
});

redisClient.on("end", () => {
  console.log("redis client connection closed");
});

export async function connectRedis(): Promise<void> {
  // if client is not open no need to connect
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const pong = await redisClient.ping();
  console.log("redis ping response", pong);
}

export async function disconnectRedis(): Promise<void> {
  /// if redis client is open then only close
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}
