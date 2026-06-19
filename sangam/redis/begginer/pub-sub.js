const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log("Error in the client ", error));

async function testAdditionalFeature() {
  try {
    await client.connect();

    // const suscriber = client.duplicate();
    // suscriber.connect();

    // await suscriber.subscribe("dummy-channel", (message, channel) => {
    //   console.log(`message is coming from the ${channel}: ${message}`);
    // });

    // await client.publish("dummy-channel", "Some random data is coming");
    // await client.publish("dummy-channel", "say welcome to the redis");

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // await suscriber.unsubscribe("dummy-channel ");
    // await suscriber.quit();

    //? pipelining && transaction

    const multi = client.multi();

    multi.set("key-transaction1", "value1");
    multi.set("key-transaction2", "value2");
    multi.get("key-transaction1");
    multi.get("key-transaction2");

    const result = await multi.exec();
    console.log(result);
  } catch (error) {
    console.error("Invalid server error", error);
  } finally {
    await client.quit();
  }
}

testAdditionalFeature();
