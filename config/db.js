const mongoose = require("mongoose");

const connectDB = async () => {
  try {
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
