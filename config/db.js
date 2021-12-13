const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //await mongoose.connect(db);
    await mongoose.connect(process.env.mongoURI);
    console.log("Connected to database.");
  } catch (error) {
    console.log(err.message);
    console.log(err.name);
    console.log(err.stack);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
