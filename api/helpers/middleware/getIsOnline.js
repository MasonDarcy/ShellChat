const getIsOnline = (Agent) => async (req, res, next) => {
  //Check if target agent exists
  try {
    const { targetAgentID } = req.body;
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");

    if (targetAgent.isOnline) {
      next();
    } else {
      return res.status(418).json({ msg: "Target agent is offline." });
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getIsOnline };
