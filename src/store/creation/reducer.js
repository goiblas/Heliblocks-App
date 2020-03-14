import { INITIAL_STATE } from "./initialState";
import * as types from "./types";

const creationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATION_CSS_SET_PREPROCESSOR:
      return {
        ...state,
        css: {
          ...state.css,
          preprocessor: action.payload
        }
      };
    case types.CREATION_HTML_PREPROCESS_SUCCESS:
      return {
        ...state,
        hasUnsavedChanges: true,
        html: {
          ...state.html,
          processed: action.payload,
          processing: false,
          error: null
        }
      };
    case types.CREATION_CSS_PREPROCESS_SUCCESS:
      return {
        ...state,
        hasUnsavedChanges: true,
        css: {
          ...state.css,
          processed: action.payload,
          processing: false,
          error: null
        }
      };
    case types.CREATION_HTML_PREPROCESS_ERROR:
      return {
        ...state,
        html: {
          ...state.html,
          error: action.payload,
          processing: false
        }
      };
    case types.CREATION_CSS_PREPROCESS_ERROR:
      return {
        ...state,
        css: {
          ...state.css,
          error: action.payload,
          processing: false
        }
      };
    case types.CREATION_HTML_PREPROCESS_START:
      return {
        ...state,
        html: {
          ...state.html,
          processing: true
        }
      };
    case types.CREATION_CSS_PREPROCESS_START:
      return {
        ...state,
        css: {
          ...state.css,
          processing: true
        }
      };
    case types.CREATION_HTML_SET_SOURCE:
      return {
        ...state,
        hasUnsavedChanges: true,
        html: {
          ...state.html,
          source: action.payload
        }
      };
    case types.CREATION_CSS_SET_SOURCE:
      return {
        ...state,
        hasUnsavedChanges: true,
        css: {
          ...state.css,
          source: action.payload
        }
      };
    case types.CREATION_INICIALIZE:
      return {
        ...INITIAL_STATE,
        ...action.payload
      };
    case types.CREATION_SAVE_START:
      return {
        ...state,
        saving: true
      };
    case types.CREATION_NOT_FOUND:
      return {
        ...state,
        notFound: true
      };
    case (types.CREATION_SAVE_ERROR, types.CREATION_SAVE_SUCCESS):
      return {
        ...state,
        hasUnsavedChanges: false,
        saving: false
      };
    case types.CREATION_SET_TAG:
      return {
        ...state,
        hasUnsavedChanges: true,
        tags: [...state.tags, ...action.payload]
      };
    case types.CREATION_UPDATE:
      return {
        ...state,
        ...action.payload,
        hasUnsavedChanges: true
      };
    default:
      return state;
  }
};

export default creationReducer;
