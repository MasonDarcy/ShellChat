import { UNSUBSCRIBE_TO_CHANNEL, UNLOAD_CHANNEL_MODULE } from "../types";
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

  dispatch({
    type: UNLOAD_CHANNEL_MODULE,
    payload: {
      currentModule: null,
    },
  });
};
