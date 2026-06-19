import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redis = createClient({ url: redisUrl });

async function run() {
  await redis.connect();
  console.log("Connected to redis");
  console.log("ping", await redis.ping());

  //! string data type
  //one key one value
  const stringKey = "string:first";

  await redis.set(stringKey, "100");
  const pageView = await redis.get(stringKey);
  console.log(pageView);

  // redis can work as a counter
  const increment = await redis.incr(stringKey);
  console.log(`Increase value ${increment}`);

  //! hash : can save one key with many fileds - small object or map inside redis

  const hashKey = "demo:user:profile";

  await redis.hSet(hashKey, {
    name: "mane",
    profile: "developer",
  });

  const extractData = await redis.hGetAll(hashKey);
  console.log(extractData);

  // list
  // collection of values in a list or array
  const listkey = "list:message";
  await redis.lPush(listkey, "Welcome");
  await redis.lPush(listkey, "hello");
  await redis.rPush(listkey, "To my code");

  const extractMessage = await redis.lRange(listkey, 0, -1);
  console.log(extractMessage);

  //   set
  // sets uniqure set of value

  //ttl - expiery
  // time to live
  // how long a key should exist before deleting
  await redis.expire(listkey, 60);

  const ttl = await redis.ttl(listkey);
  console.log(ttl);

  await redis.quit();
}

run().catch((error) => {
  console.error("Failed to connect to redis", error);
  process.exit(1);
});
