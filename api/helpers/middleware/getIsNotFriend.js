const getIsNotFriend = (Agent) => async (req, res, next) => {
  //Check if target agent exists
  try {
    const { targetAgentID } = req.body;
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");

    if (!targetAgent.friends.includes(req.session.userID)) {
      console.log(`isNotFriend/succes, is not friend yet`);
      next();
    } else {
      console.log(`isNotFriend/fail, is already your friend`);
      return res
        .status(403)
        .json({ msg: "Target agent is already your friend." });
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getIsNotFriend };
