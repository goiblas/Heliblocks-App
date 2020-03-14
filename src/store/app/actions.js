import * as types from "./types";

export const setLoading = payload => ({
  type: types.SET_LOADING,
  payload
});

export const setMessage = (type, message) => ({
  type: types.ADD_MESSAGE,
  payload: {
    type,
    message
  }
});
