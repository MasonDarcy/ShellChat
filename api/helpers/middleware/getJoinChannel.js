const getJoinChannel = (Channel) => async (req, res, next) => {
  try {
    const { channel_id } = req.params;

    const targetChannel = await Channel.findOne({
      channelName: channel_id,
    });

    if (!targetChannel) {
      console.log(
        "joinChannel/targetChannel does not exist, creating it now, adding the agent."
      );
      //Create the channel
      const newChannel = Channel({
        channelName: channel_id,
        currentChannelListeners: [req.session.userID],
      });
      await newChannel.save();
      next();
    } else {
      targetChannel.currentChannelListeners.unshift(req.session.userID);
      await targetChannel.save();
      next();
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getJoinChannel };
