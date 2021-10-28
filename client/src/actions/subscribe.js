import { SUBSCRIBE_TO_CHANNEL } from "./types";

export const subscribeToChannel = (channelID) => (dispatch) => {
  dispatch({
    type: SUBSCRIBE_TO_CHANNEL,
    payload: { channelID },
  });
};
