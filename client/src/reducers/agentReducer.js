import { types } from "../actions/types";

const initialState = {
  agentName: null,
  isLoggedOn: false,
  commandState: true,
  demoMode: false,
  agentCanceledDemo: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_AGENT_NAME:
    case types.LOGIN:
    case types.AUTO_LOGIN:
    case types.LOGOUT:
      console.log(
        `Inside reducer: ${types.LOGIN}: payload: ${payload.agentName}`
      );
      return {
        ...state,
        agentName: payload.agentName,
        isLoggedOn: payload.isLoggedOn,
      };
    case types.SWAP_COMMAND_STATE:
      return {
        ...state,
        commandState: !state.commandState,
      };
    case types.DEMO_MODE_ON:
      return {
        ...state,
        demoMode: true,
      };
    case types.DEMO_MODE_OFF:
      return {
        ...state,
        demoMode: false,
      };
    case types.AGENT_CANCELLED_DEMO:
      return {
        ...state,
        agentCanceledDemo: true,
      };
    case types.RESET_AGENT_CANCELLED:
      return {
        ...state,
        agentCanceledDemo: false,
      };
    default:
      return state;
  }
}
