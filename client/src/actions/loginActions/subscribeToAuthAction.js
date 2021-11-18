import store from "../../store/store";
import { SUBSCRIBE_TO_AUTH } from "../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../constants/constants";
import {
  setSource,
  setSubscriberCallback,
} from "../subcriberHelpers/setSubscriberListeners";
import { serverMessageAction } from "../messageActions/serverMessageAction";

export const subscribeToAuthAction = (agentName) => async (dispatch) => {
  /*
  Server sent event connection that keeps track of an agent "connection"
  There can be multiple of these -- an agent is "logged out" when they have 0.
  For now, does not recieve any events.
  */
  let authSource = setSource(
    "http://localhost:5000/api/agents/auth/connect",
    [agentName],
    ReconnectingEventSource
  );

  dispatch({
    type: SUBSCRIBE_TO_AUTH,
    payload: { authSource: authSource, isSubscribed: true },
  });
};