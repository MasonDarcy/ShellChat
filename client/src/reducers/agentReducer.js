import { SET_AGENT_NAME } from "../actions/types";

const initialState = {
  agentName: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AGENT_NAME:
      return {
        ...state,
        agentName: payload.agentName,
      };
    default:
      return state;
  }
}
