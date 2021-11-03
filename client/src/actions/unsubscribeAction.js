import { UNSUBSCRIBE_TO_CHANNEL } from "./types";
import { NEW_MESSAGE } from "./types";
import store from "../store/store";
export const unsubscribeAction = () => (dispatch) => {
  store.getState().subscribeToChannelReducer.source.close();

  dispatch({
    type: UNSUBSCRIBE_TO_CHANNEL,
    payload: { source: null },
  });
};
