// string
// hash
// list
// set
// sorted set
// ttl

// string
// stores one value under one key
// plain text, numbers stored as text, counters
// key: page_views
// value: "100"

import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6380";

const redis = createClient({ url: redisUrl });

async function run() {
  // open connection to redis server
  await redis.connect();
  console.log("connected to redis");
  console.log("ping", await redis.ping());

  // string
  const stringKey = "demo:page_views";

  await redis.set(stringKey, "100");

  const pageviews = await redis.get(stringKey);
  console.log(pageviews);

  // redis strings can also work like counters

  const afterIncr = await redis.incr(stringKey);
  console.log(afterIncr);

  // hash
  // stores many small fields under one key - small object or map inside redis

  // key: keyname
  // fields:
  // name -> "sangam"
  // email -> "email"

  const hashKey = "demo:user:profile";

  await redis.hSet(hashKey, {
    name: "sangam",
    city: "usa",
  });

  const extractProfileInfo = await redis.hGetAll(hashKey);
  console.log(extractProfileInfo);

  // list
  // redis list ordered collection of values
  const listKey = "demo:messages";
  await redis.lPush(listKey, "hello");
  await redis.lPush(listKey, "hi, redis");

  const extractMessages = await redis.lRange(listKey, 0, -1);
  console.log(extractMessages);

  // lpush - adds a new item at beginning
  // lrange - reads items from the list
  // RPUSH - adds the itsm at end
  // ltrim - keeps only part of the list

  // set
  // sets unique sets of values only

  const setKey = "demo:tags";

  await redis.sAdd(setKey, "nodejs");
  await redis.sAdd(setKey, "nextjs");
  await redis.sAdd(setKey, "nextjs");

  const tagCount = await redis.sCard(setKey);
  console.log(tagCount);

  const rankKey = "demo:leaderboard";

  await redis.zAdd(rankKey, { score: 100, value: "player_a" });
  await redis.zAdd(rankKey, { score: 200, value: "player_b" });

  const newScore = await redis.zIncrBy(rankKey, 50, "player_a");
  console.log(newScore);

  // 0 = top rank
  const rank = await redis.zRevRank(rankKey, "player_a");
  console.log(rank);

  // ttl / expiry
  // time to live
  // it tells redis how long a key should exists before being deleted automatically

  // key - a
  // value : "345"
  // ttl: 300 second
  // after 5 min redis is going to delete this key automatically

  const otpKey = "demo:otp";

  await redis.set(otpKey, "123456");

  await redis.expire(otpKey, 60);

  const ttl = await redis.ttl(otpKey);

  console.log(ttl);

  await redis.quit();
}

run().catch((error) => {
  console.error("demo failed:", error);
  process.exit(1);
});
