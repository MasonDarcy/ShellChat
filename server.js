const express = require("express");
const config = require("config");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");

//Session
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Connect to Mongo
db.connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
//   optionSuccessStatus: 200,
// };

//app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(
  session({
    secret: process.env.sessionSecret,
    name: "sid",
    cookie: { maxAge: 100000000, httpOnly: true },

    resave: true,
    store: MongoStore.create({ mongoUrl: process.env.mongoURI }),
    saveUninitialized: false,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use(express.json());

app.use("/api/agents", require("./api/agents"));
app.use("/api/chat", require("./api/chat"));
app.use("/api/friends", require("./api/friends"));

//Serve static assets in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
