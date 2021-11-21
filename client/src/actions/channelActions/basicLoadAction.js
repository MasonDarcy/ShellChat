import { types } from "../types";
export const basicLoadAction = (moduleType) => async (dispatch) => {
  console.log(`basicLoadAction: moduleType: ${moduleType}`);
  dispatch({
    type: types.LOAD_CHANNEL_MODULE,
    payload: {
      currentModule: moduleType,
    },
  });
};
