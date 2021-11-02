import { CLEAR_MESSAGES, NEW_MESSAGE } from "../actions/types";

const initialState = {
  messageLog: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messageLog: [...state.messageLog, payload.message],
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
