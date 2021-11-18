import { LOAD_CHANNEL_MODULE } from "../types";
export const basicLoadAction = (moduleType) => async (dispatch) => {
  console.log(`basicLoadAction: moduleType: ${moduleType}`);
  dispatch({
    type: LOAD_CHANNEL_MODULE,
    payload: {
      currentModule: moduleType,
    },
  });
};
