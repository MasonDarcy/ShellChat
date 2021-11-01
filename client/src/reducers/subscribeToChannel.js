import { SUBSCRIBE_TO_CHANNEL } from "../actions/types";

const initialState = {
  previousChannelID: null,
  currentChannelID: null,
  isSubscribed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        previousChannelID: state.currentChannelID,
        currentChannelID: payload.channelID,
        isSubscribed: true,
      };
    default:
      return state;
  }
}
