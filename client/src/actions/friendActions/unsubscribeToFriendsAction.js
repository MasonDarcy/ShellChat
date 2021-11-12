import { UNSUBSCRIBE_TO_FRIENDS } from "../types";
import store from "../../store/store";
export const unsubscribeToFriendsAction = () => (dispatch) => {
  store.getState().subscribeToFriendsReducer.friendSource.close();

  dispatch({
    type: UNSUBSCRIBE_TO_FRIENDS,
    payload: {
      friendSource: null,
      isSubscribed: false,
    },
  });
};
