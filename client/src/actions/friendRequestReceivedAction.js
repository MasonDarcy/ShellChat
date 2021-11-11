import { NEW_MESSAGE } from "./types";

export const friendRequestReceivedAction = (sourceAgent) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: {
      message: `Received friend request from ${sourceAgent}`,
      eventName: "CHAT_EVENT",
    },
  });
};
