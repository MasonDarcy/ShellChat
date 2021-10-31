import { SUBSCRIBE_TO_CHANNEL } from "./types";

export const subscribeAction = (channelID, channelPassword) => (dispatch) => {
  dispatch({
    type: SUBSCRIBE_TO_CHANNEL,
    payload: { channelID, channelPassword },
  });
};
