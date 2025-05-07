const { CountPostUser } = require("./concepts/aggeration");
const {
  createUserTable,
  insertUserQuery,
  fetchallUser,
  updateUserEmail,
  deleteInfo,
} = require("./concepts/basic-query");
const {
  filterQuery,
  SortQuery,
  paginationQuert,
} = require("./concepts/filtering-sorting");
const { getUserWithPost, getAllUserWithPost } = require("./concepts/joins");
const { createPostTable, insertNewPost } = require("./concepts/relationship");

require("dotenv").config();

//! npm i pg to install postgre

async function testBasicQuery() {
  try {
    // await createUserTable();
    //? insert user
    await insertUserQuery("manish mdr", "mdr@gmail.com");
    await insertUserQuery("john mdr", "mjsdfn@gmail.com");
    await insertUserQuery("nikola jackson", "iasfsahal@gmail.com");
    //? fetch all the user
    // const alluser = await fetchallUser();
    // console.log(alluser);
    //? update user email using there username
    // const updateUser = await updateUserEmail(
    //   "Maish mdr",
    //   "exambored@gmail.com"
    // );
    // console.log(updateUser);
    //? delete user by there username
    // const deleteUser = await deleteInfo("john mdr");
    // console.log("deleted user", deleteUser);
  } catch (error) {
    console.error("Error occurred in testBasicQuery:", error);
  }
}

async function testFilterQuery() {
  try {
    // const zfilter = await filterQuery("username LIKE 'm%'");
    // console.log(zfilter);

    // const sortUser = await SortQuery("created_at ", "DESC");
    // console.log(sortUser);

    const pagination = await paginationQuert(2, 0);
    console.log(pagination);
  } catch (error) {
    console.error(error);
  }
}

async function testRelationship() {
  try {
    // const post = await createPostTable();

    await insertNewPost("hello_world3", "Coding day", 1);
    await insertNewPost("hello_world4", "Coding oday", 1);
    // await insertNewPost("hello_world2", "Coding tommorrow", 3);
    console.log("post added ");
  } catch (error) {
    console.log(error);
  }
}

async function textJoinQuerys() {
  try {
    // const usersWithPost = await getUserWithPost();
    // console.log(usersWithPost);

    const postdata = await getAllUserWithPost();
    console.log(postdata);
  } catch (error) {
    console.error(error);
  }
}

async function testAggregateFun() {
  try {
    const countPost = await CountPostUser();
    console.log(countPost);
  } catch (error) {
    console.error(error);
  }
}

async function testAllQuery() {
  // testBasicQuery();
  // testFilterQuery();
  // testRelationship();
  // await textJoinQuerys();\
  await testAggregateFun();
}

testAllQuery();
