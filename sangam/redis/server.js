const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// event listner
client.on("error", (error) => console.log("error in the client ", error));

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("Redis connected");

    await client.set("name", "Manish");
    const getValue = await client.get("name");
    console.log(getValue);

    const deleteCount = await client.del("name");
    console.log(deleteCount);

    const updatedValue = await client.get("name");
    console.log(updatedValue);

    await client.set("count", "100");
    const increment = await client.incr("count");
    console.log(increment);
    const decrement = await client.decr("count");
    console.log(decrement);
  } catch (error) {
    console.error("Invalid server error", error);
  } finally {
    client.quit();
  }
}

testRedisConnection();
