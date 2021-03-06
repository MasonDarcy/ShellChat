import {
  CLEAR_MESSAGES,
  NEW_MESSAGE,
  NEW_CHANNEL_MESSAGE,
  NEW_HELP_MESSAGE,
  NEW_ERROR_MESSAGE,
  NEW_FRIEND_MESSAGE,
  NEW_SERVER_MESSAGE,
  AGENT_ACTION_MESSAGE,
  JSX_MESSAGE,
} from "../actions/types";

const initialState = {
  messageLog: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NEW_SERVER_MESSAGE:
    case NEW_HELP_MESSAGE:
    case NEW_ERROR_MESSAGE:
    case NEW_CHANNEL_MESSAGE:
    case NEW_MESSAGE:
    case NEW_FRIEND_MESSAGE:
    case AGENT_ACTION_MESSAGE:
    case JSX_MESSAGE:
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
