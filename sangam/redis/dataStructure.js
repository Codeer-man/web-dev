const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => console.log("error in the redis", error));

async function redisDataStructure() {
  try {
    await client.connect();
    console.log("Redis connected");

    //! string = set,get, mset,mget,
    await client.mSet([
      "user:name",
      "Manish Manandhar",
      "user:age",
      "19",
      "user:country",
      "Nepal",
    ]);
    const [name, age, country] = await client.mGet([
      "user:name",
      "user:age",
      "user:country",
    ]);
    // console.log(name, age, country);

    //! list  lpush,rpush,lrange,lpop,rpop
    // await client.lPush("note", ["note1", "note2", "note3"]);
    const extractData = await client.lRange("note", 0, -1);
    // console.log(extractData);

    // const pop = await client.lPop("note");
    // console.log(pop);

    const remaningData = await client.lRange("note", 0, -1);
    // console.log(remaningData);

    // !sets = sadd,smemebers,sismember,srem

    // await client.sAdd("user:NickName", ["manandhar", "man", "xyz"]);
    // const extractAddData = await client.sMembers("user:NickName");
    // console.log(extractAddData);

    // const checkMDR = await client.sIsMember("user:NickName", "manandhar");
    // console.log(checkMDR);

    // await client.sRem("user:NickName", "xyz");
    // const getExistingNickName = await client.sMembers("user:NickName");
    // console.log(getExistingNickName);

    //! sorted set zadd,zrange,zrank,zrem

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "cart",
    //   },
    //   {
    //     score: 150,
    //     value: "cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "cart 3",
    //   },
    // ]);

    // const getCart = await client.zRange("cart", 0, -1);
    // console.log(getCart);

    // const getCartwithscore = await client.zRangeWithScores("cart", 0, -1);
    // console.log(getCartwithscore);

    // const cartRank = await client.zRank("cart", "cart 2");
    // console.log(cartRank);

    //! hashes hset hget hgetall hdel

    await client.hSet("Product:1", {
      name: "Product 1",
      description: "Product one detail",
      rating: "5",
    });

    const getdetail = await client.hGet("Product:1", "rating");
    console.log(getdetail);

    const getallDetail = await client.hGetAll("Product:1");
    console.log(getallDetail);

    await client.hDel("Product:1", "rating");

    const updateProduct = await client.hGetAll("Product:1");
    console.log(updateProduct);
  } catch (error) {
    console.error(error);
  } finally {
    client.quit();
  }
}

redisDataStructure();
