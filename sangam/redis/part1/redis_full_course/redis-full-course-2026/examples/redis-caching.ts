import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6380";

const redis = createClient({ url: redisUrl });

// cache key there
const cacheKey = "demo:products";
const cacheTtlSeconds = 60; // cache will expire after 60 seconds

let dbProducts = ["Keyboard", "Mouse", "Laptop"];

async function run() {
  await redis.connect();

  // first request - cache miss

  let cached = await redis.get(cacheKey);

  // cache aside pattern
  if (cached) {
    console.log("cache HIT");
    console.log("data", JSON.parse(cached));
  } else {
    console.log("cache MIsS");
    // read from main db
    const products = dbProducts;

    // set/save the products in redis cache
    // setEx - also saves ttl so that your cache doesn't live forever
    await redis.setEx(cacheKey, cacheTtlSeconds, JSON.stringify(products));
  }

  // stale cache problem
  dbProducts = ["Keyboard", "Mouse", "Laptop", "Desktop"];
  console.log(dbProducts, "dbProducts");

  cached = await redis.get(cacheKey);
  console.log("cached data", JSON.parse(cached!));

  // cache invalidation
  // when DB changes - delete ur old cache immediately

  await redis.del(cacheKey);
  console.log("Cache deleted");

  cached = await redis.get(cacheKey);

  if (!cached) {
    console.log("Cache data after delete");
    // data from ur db changes
    const freshProducts = dbProducts;
    await redis.setEx(cacheKey, cacheTtlSeconds, JSON.stringify(freshProducts));
    console.log("fresh data", freshProducts);
  }

  await redis.quit();
}

run().catch((error) => {
  console.error("Caching demo failed:", error);
  process.exit(1);
});
