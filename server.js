const express = require("express");
const config = require("config");
const db = require("./config/db");

//Connect to Mongo
db.connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
