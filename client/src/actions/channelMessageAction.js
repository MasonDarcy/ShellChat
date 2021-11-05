import { NEW_CHANNEL_MESSAGE } from "./types";

export const channelMessageAction = (agent, eventName) => (dispatch) => {
  dispatch({
    type: NEW_CHANNEL_MESSAGE,
    payload: { agent: agent, eventName: eventName },
  });
};
