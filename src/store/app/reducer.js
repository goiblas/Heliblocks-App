import { INITIAL_STATE } from "./initialState";
import * as types from "./types";

const appReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

export default appReducer;
