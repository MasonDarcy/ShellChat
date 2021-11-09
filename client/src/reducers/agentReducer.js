import { SET_AGENT_NAME, LOGIN, AUTO_LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  agentName: null,
  isLoggedOn: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AGENT_NAME:
    case LOGIN:
    case AUTO_LOGIN:
    case LOGOUT:
      return {
        ...state,
        agentName: payload.agentName,
        isLoggedOn: payload.isLoggedOn,
      };
    default:
      return state;
  }
}
