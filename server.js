const express = require("express");
const config = require("config");
const db = require("./config/db");
const cors = require("cors");
//Server sent events
//const ssEvents = require("express-sse");

//Session
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Connect to Mongo
db.connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ["set-cookie"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// app.use("/", (req, res, next) => {
//   console.log("Request HTTP Version: ", req.httpVersion);
// });

app.use(
  session({
    secret: config.get("sessionSecret"),
    name: "sid",
    cookie: { maxAge: 990000, httpOnly: false },
    resave: true,
    store: MongoStore.create({ mongoUrl: config.get("mongoURI") }),
    saveUninitialized: false,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use(express.json());

// app.use((req, res) => {
//   console.log(req.session.userID);
// });

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server responded.",
  });
});

app.use("/api/agents", require("./api/agents"));
app.use("/api/chat", require("./api/chat"));
