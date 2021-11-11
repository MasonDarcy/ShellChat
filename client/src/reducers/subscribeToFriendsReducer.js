import { SUBSCRIBE_TO_FRIENDS } from "../actions/types";

const initialState = {
  friendSource: null,
  isSubscribed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIBE_TO_FRIENDS:
      return {
        ...state,
        friendSource: payload.friendSource,
        isSubscribed: payload.isSubscribed,
      };
    default:
      return state;
  }
}
