import { SET_AGENT_NAME } from "./types";

export const setAgentNameAction = (agentName) => (dispatch) => {
  dispatch({
    type: SET_AGENT_NAME,
    payload: { agentName: agentName },
  });
};
