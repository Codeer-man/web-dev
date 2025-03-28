import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1");
await client.connect();

const db = client.db("Mongodb_nodejs");
const userCollectoin = db.collection("User");

// userCollectoin.insertOne({ name: "Manish Manandhar", age: 19 });

// userCollectoin.insertMany([
//   { name: "Manish Manandhar1", role: "user", age: 17 },
//   { name: "Manish Manandhar2", role: "user", age: 20 },
//   { name: "Manish Manandhar3", role: "admin", age: 18 },
// ]);

// Read

// const usercursor = userCollectoin.find();

// for await (const user of usercursor) {
//     console.log(user);
// }

// const usercursor = await userCollectoin.find().toArray();
// console.log(usercursor);

// const usercursor = await userCollectoin.findOne({ name: "Manish Manandhar2" });
// console.log(usercursor);

// update
// const user = await userCollectoin.updateOne(
//   {
//     name: "Manish Manandhar",
//   },
//   { $set: { age: 30 } }
// );

// Delete
// const usercursor = await userCollectoin.deleteOne({ name: "Manish Manandhar" });
const usercursor = await userCollectoin.deleteMany({
  name: "Manish Manandhar",
});
console.log(`${usercursor.deletedCount} document deleated`);
