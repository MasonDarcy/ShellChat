import { UNSUBSCRIBE_TO_CHANNEL } from "../types";
import store from "../../store/store";
export const unsubscribeAction = () => (dispatch) => {
  store.getState().subscribeToChannelReducer.channelSource.close();

  dispatch({
    type: UNSUBSCRIBE_TO_CHANNEL,
    payload: {
      channelSource: null,
      currentChannelID: null,
      isSubscribed: false,
    },
  });
};
