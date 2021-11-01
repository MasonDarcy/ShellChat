import { SUBSCRIBE_TO_CHANNEL } from "./types";
import sendChat from "../components/helpers/sendChat";

export const subscribeAction = (channelID, channelPassword) => (dispatch) => {
  sendChat(
    "User has joined the channel, dispatched from redux action.",
    channelID
  );

  dispatch({
    type: SUBSCRIBE_TO_CHANNEL,
    payload: { channelID, channelPassword },
  });
};
