import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redis = createClient({ url: redisUrl });

const prodKey = "demo:product";
const productTTL = 60;
let dbProduct = ["mouse", "monitor", "money"];

async function run() {
  await redis.connect();

  // on our first request = cache miss
  let cacheData = await redis.get(prodKey);

  //cache aside patter
  if (cacheData) {
    console.log("cache hit");
    console.log(JSON.parse(cacheData));
  } else {
    console.log("cache miss");

    //read from mail db
    const product = dbProduct;

    //searlize the arry value using JSON.stringify
    const data = await redis.setEx(
      prodKey,
      productTTL,
      JSON.stringify(product),
    );
    console.log(data);
  }

  // stale caching problem  = the main db data is changed but the cache has the old data
  // to solve it = cache invalidation method is used

  // new main db data
  dbProduct = ["mouse", "monitor", "money", "mane"];

  // cache incalidation : deleting the old cache data
  await redis.del(prodKey);
  console.log("Cache deleted");

  cacheData = await redis.get(prodKey);

  if (!cacheData) {
    // new data
    console.log("Cached data after deleted");

    const freshdbData = dbProduct;

    await redis.setEx(prodKey, productTTL, JSON.stringify(freshdbData));

    console.log("fresh data", freshdbData);
  }

  await redis.quit();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
