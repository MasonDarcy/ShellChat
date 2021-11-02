import { SUBSCRIBE_TO_CHANNEL } from "./types";
import { NEW_MESSAGE } from "./types";
import {
  setSource,
  setSubscriberCallback,
} from "../components/helpers/channelHelpers";

export const subscribeAction = (channelID, channelPassword) => (dispatch) => {
  let source = setSource(channelID);

  setSubscriberCallback(source, (e) => {
    let withQuotes = e.data.toString();
    let trimmedMessage = withQuotes.substring(1, withQuotes.length - 1);
    dispatch({
      type: NEW_MESSAGE,
      payload: { message: trimmedMessage },
    });
  });

  dispatch({
    type: SUBSCRIBE_TO_CHANNEL,
    payload: { source, channelID, channelPassword },
  });
};
