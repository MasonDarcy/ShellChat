import { SET_AGENT_NAME, LOGIN } from "../actions/types";

const initialState = {
  agentName: null,
  isLoggedOn: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AGENT_NAME:
    case LOGIN:
      return {
        ...state,
        agentName: payload.agentName,
      };
    default:
      return state;
  }
}
