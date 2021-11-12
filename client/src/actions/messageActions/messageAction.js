import { NEW_MESSAGE } from "../types";

export const messageAction =
  (message, agent, eventName, channelID) => (dispatch) => {
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        message: message,
        agent: agent,
        eventName: eventName,
        channelID: channelID,
      },
    });
  };
