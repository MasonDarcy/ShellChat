const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const ssEvents = require("expres-sse");
let sse = new ssEvents([""]);

router.get("/getMessages", sse.init);

router.post("/sendMessage", (req, res) => {
  try {
    let message = req.body.message;
    sse.updateInit([message]);
    res.status(200).json({ msg: "Successfully updated sse." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
