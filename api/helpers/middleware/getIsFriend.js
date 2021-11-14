const getIsFriend = (Agent) => async (req, res, next) => {
  //Check if target agent exists
  try {
    const { targetAgentID } = req.body;
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");

    if (targetAgent.friends.includes(req.session.userID)) {
      next();
    } else {
      return res.status(403).json({ msg: "Target agent is not your friend." });
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getIsFriend };
