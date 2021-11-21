import { types } from "../types";
import keys from "../../constants/constants";
import store from "../../store/store";
export const unsubscribeAction = () => (dispatch) => {
  store.getState().subscribeToChannelReducer.channelSource.close();
  let oldChannel = store.getState().subscribeToChannelReducer.currentChannelID;

  dispatch({
    type: types.UNSUBSCRIBE_TO_CHANNEL,
    payload: {
      channelSource: null,
      currentChannelID: null,
      isSubscribed: false,
    },
  });

  dispatch({
    type: types.UNLOAD_CHANNEL_MODULE,
    payload: {
      currentModule: null,
    },
  });

  dispatch({
    type: types.NEW_SERVER_MESSAGE,
    payload: {
      message: `Exited channel: ${oldChannel}`,
      eventName: keys.COMMAND_SUCCESS_EVENT_KEY,
    },
  });
};
