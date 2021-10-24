const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const chat = new MyEmitter();

const useServerSentEventsMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive: ");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.flushHeaders();
  const sendEventStreamData = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    res.write(sseFormattedResponse);
  };
  res.sendEventStreamData = sendEventStreamData;
  next();
};

const interceptChat = (req, res) => {
  chat.removeAllListeners();

  chat.on("chatEvent", (data) => {
    res.sendEventStreamData(data);
  });

  res.on("close", () => {
    //res.end();
  });
};

router.get("/chat", useServerSentEventsMiddleware, interceptChat);

router.post("/sendMessage", (req, res) => {
  try {
    let message = req.body.message;

    chat.emit("chatEvent", message);
    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
