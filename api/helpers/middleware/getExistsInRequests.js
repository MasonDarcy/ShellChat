const getExistsInRequests = (Agent) => async (req, res, next) => {
  //Check if target agent exists
  try {
    const { targetAgentID } = req.body;
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");

    const accepterAgent = await Agent.findById(req.session.userID).select(
      "-password"
    );

    if (accepterAgent.requests.includes(targetAgent.id)) {
      next();
    } else {
      return res
        .status(418)
        .json({ msg: "Target agent doesn't want to be your friend." });
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getExistsInRequests };
