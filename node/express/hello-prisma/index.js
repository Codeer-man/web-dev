import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // create one user

  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Manish",
  //       email: "Manandhar@gmail.com",
  //     },
  //   });
  //   console.log(user);

  // create many users
  //   const user = await prisma.user.createMany({
  //     data: [
  //       {
  //         name: "Mane",
  //         email: "hero@gmail.com",
  //       },
  //       {
  //         name: "albert",
  //         email: "zero@gmail.com",
  //       },
  //     ],
  //   });
  //   console.log(user);

  // read users
  // const readUser = await prisma.user.findMany();
  // console.log(readUser);

  // get user bt id
  // const user = await prisma.user.findUnique({
  //   where: { id: 2 },
  // });
  // console.log(user);

  // update the user
  //   const updateUser = await prisma.user.update({
  //     where: { id: 2 },
  //     data: {
  //       name: "ManeTheSoccer",
  //     },
  //   });

  // delete data
  const deleteUser = await prisma.user.delete({
    where: { id: 2 },
  });

  const read = await prisma.user.findMany();
  console.log(read);
};

main()
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
