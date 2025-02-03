const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mdrmoney34:jdIxgS19HPM6Mzlm@cluster0.ghv2q.mongodb.net/"
  )
  .then(() => console.log("database connected"))
  .catch((e) => console.log("not connected ", e));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// create user model
const User = mongoose.model("User", userSchema);

async function runQueryExample() {
  try {
    // creating new document
    // method 1

    // const NewUser =await User.create({
    //   name: "John Doe",
    //   age: 30,
    //   email: "john.doe@example.com",
    //   isActive: true,
    //   tags: ["tech", "dev"],
    // });

    // method 2
    // const NewUser = new User({
    //   name: "stacks Doe",
    //   age: 55,
    //   email: "stacks.doe@example.com",
    //   isActive: false,
    //   tags: ["tech", "dev"],
    // });
    // await NewUser.save();

    // get all user
    // const alluser = await User.find({});
    // console.log(alluser);

    // get specific  user
    // const getUserIsActiveFalse = await User.find({ isActive: false});
    // console.log(getUserIsActiveFalse);

    // get first single user
    // const getFirstLanasterUser = await User.findOne({ name: "lanaster Doe" });
    // console.log(getFirstLanasterUser);

    // const getUserById = await User.findById(NewUser._id);
    // console.log(getUserById);

    // const selectField = await User.find().select('name email -_id');
    // console.log(selectField);

    // const limitedUser = await User.find().limit(5).skip(1)
    // console.log(limitedUser);

    // const sort = await User.find().sort({ age: -1 });
    // console.log(sort);

    // const countdoc = await User.countDocuments({isActive : false})
    // console.log(countdoc);

    // const deletedoc = await User.deleteOne({_id: '67964221e0352bbb65c5f76c'})
    // console.log(deletedoc);

    const updatedoc = await User.updateOne(
      { _id: "679640efd5963871485fb2c9" },
      {
        $set: { age: 100 },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log(updatedoc);
  } catch (error) {
    console.log("error in the queryExample");
  } finally {
    mongoose.connection.close();
  }
}

runQueryExample();
