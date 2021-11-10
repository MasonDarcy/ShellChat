const getVerifyAgentExists = (Agent) => async (req, res, next) => {
  //Check if target agent exists
  try {
    const { targetAgentID } = req.body;
    console.log(targetAgentID);
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");
    console.log(targetAgent);
    if (!targetAgent) {
      return res.status(404).json({ msg: "Target agent does not exist." });
    } else {
      next();
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getVerifyAgentExists };
