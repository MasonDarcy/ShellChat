import { types } from "../actions/types";

const initialState = {
  codeEditorRef: null,
  outputLog: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_EDITOR_REF:
      return {
        ...state,
        codeEditorRef: payload.codeEditorRef,
      };
    case types.NEW_CODE_EDITOR_OUTPUT:
      return {
        ...state,
        outputLog: [...state.outputLog, payload],
      };
    default:
      return state;
  }
}
