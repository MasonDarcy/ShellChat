import {
  CLEAR_MESSAGES,
  NEW_MESSAGE,
  NEW_CHANNEL_MESSAGE,
  NEW_HELP_MESSAGE,
} from "../actions/types";

const initialState = {
  messageLog: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(`payload inside reducer: ${payload}`);
  switch (type) {
    case NEW_HELP_MESSAGE:
    case NEW_CHANNEL_MESSAGE:
    case NEW_MESSAGE:
      return {
        ...state,
        messageLog: [...state.messageLog, payload],
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messageLog: [],
      };
    default:
      return state;
  }
}
