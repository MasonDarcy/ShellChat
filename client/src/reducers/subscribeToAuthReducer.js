import { SUBSCRIBE_TO_AUTH, UNSUBSCRIBE_TO_AUTH } from "../actions/types";

const initialState = {
  authSource: null,
  isSubscribed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIBE_TO_AUTH:
      return {
        ...state,
        authSource: payload.authSource,
        isSubscribed: payload.isSubscribed,
      };
    default:
      return state;
  }
}
