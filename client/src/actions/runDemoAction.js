import { types } from "./types";

export const runDemoAction = () => async (dispatch) => {
  dispatch({
    type: types.DEMO_MODE_ON,
  });
};
