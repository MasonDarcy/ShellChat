import { types } from "../types";
export const basicLoadAction = (moduleType) => async (dispatch) => {
  dispatch({
    type: types.LOAD_CHANNEL_MODULE,
    payload: {
      currentModule: moduleType,
    },
  });
};
