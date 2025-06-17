import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { userTable } from './schema/user.sql';
import { authTable } from './schema/auth.sql';
  
const db = drizzle({connection: process.env.DATABASE_URL!,casing: "snake_case"});

//  async function main() {
//   const user: typeof userTable.$inferInsert= {
//     name: "mamandhar",
//     email:"example@gmail.com",
//     age: 34
//   }

//   // await db.insert(userTable).values(user);
//   // console.log("data inserted");

//   const users =await db.select().from(userTable)
//   console.log(users);

//   const update = await db.update(userTable).set({
//     name:"manish",
//     age:19
//   }).where(eq(userTable.email,user.email))
//   console.log(update,"updated data");
   
//   await db.delete(userTable).where(eq(userTable.email,user.email))
// }
async function data() {
  const userCount = await db.$count(userTable)
console.log(userCount,"user count");

  await db.insert(authTable).values({
    firstName:"manish",
    lastName:"manandhar",
  })

  console.log(await db.select().from(authTable),"auth data");
  
}


data()