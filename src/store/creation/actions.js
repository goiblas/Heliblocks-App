import * as types from "./types";
import preprocces from "./../../services/preprocces";

export const saveCreation = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState();
  const firestore = getFirestore();

  dispatch({ type: types.CREATION_SAVE_START });
  try {
    const lastUpdate = new Date();
    const {
      id,
      title,
      description,
      tags,
      template,
      theme,
      publised,
      alignment,
      html,
      css
    } = state.creation;
    await firestore
      .collection("heliblocks")
      .doc(id)
      .update({
        title,
        description,
        tags,
        template,
        theme,
        lastUpdate,
        publised,
        alignment,
        html,
        css
      });
    dispatch(updateCreation({ lastUpdate }));
    dispatch({ type: types.CREATION_SAVE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.CREATION_SAVE_ERROR });
  }
};

export const saveNewCreation = () => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const state = getState();
  const firestore = getFirestore();
  const firebase = getFirebase();
  dispatch({ type: types.CREATION_SAVE_START });

  try {
    const createdAt = new Date();
    const lastUpdate = new Date();
    const author = state.firebase.auth.uid;
    const {
      title,
      description,
      tags,
      template,
      theme,
      publised,
      alignment,
      html,
      css
    } = state.creation;
    const { id } = await firestore.collection("heliblocks").add({
      title,
      description,
      tags,
      template,
      theme,
      lastUpdate,
      publised,
      alignment,
      html,
      css,
      createdAt,
      author
    });
    await firestore
      .collection("users")
      .doc(author)
      .update({
        heliblocks: firebase.firestore.FieldValue.arrayUnion(id)
      });
    dispatch(updateCreation({ id, createdAt, lastUpdate, author }));
    dispatch({ type: types.CREATION_SAVE_SUCCESS });
  } catch (error) {
    dispatch({ type: types.CREATION_SAVE_ERROR });
  }
};

export const getCreationById = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  try {
    const doc = await firestore
      .collection("heliblocks")
      .doc(id)
      .get();
    if (doc.exists) {
      const heliblock = {
        ...doc.data(),
        id: doc.id
      };
      dispatch(initializeCreation(heliblock));
    } else {
      dispatch({ type: types.CREATION_NOT_FOUND });
    }
  } catch (error) {
    // @TODO
  }
};

export const initializeCreation = payload => ({
  type: types.CREATION_INICIALIZE,
  payload
});

export const updateCreation = payload => ({
  type: types.CREATION_UPDATE,
  payload
});

export const setCssPreprocessor = payload => ({
  type: types.CREATION_CSS_SET_PREPROCESSOR,
  payload
});

export const setCssSource = payload => async (dispatch, getState) => {
  const {
    creation: {
      css: { preprocessor }
    }
  } = getState();
  dispatch({
    type: types.CREATION_CSS_SET_SOURCE,
    payload
  });
  dispatch({ type: types.CREATION_CSS_PREPROCESS_START });
  try {
    const response = await preprocces(preprocessor, payload);
    if (response.success) {
      dispatch({
        type: types.CREATION_CSS_PREPROCESS_SUCCESS,
        payload: response.code
      });
    } else {
      dispatch({
        type: types.CREATION_CSS_PREPROCESS_ERROR,
        payload: response.error
      });
    }
  } catch (error) {
    dispatch({
      type: types.CREATION_CSS_PREPROCESS_ERROR,
      payload: error
    });
  }
};
export const setHtmlSource = payload => async (dispatch, getState) => {
  const {
    creation: {
      html: { preprocessor }
    }
  } = getState();
  dispatch({
    type: types.CREATION_HTML_SET_SOURCE,
    payload
  });
  dispatch({ type: types.CREATION_HTML_PREPROCESS_START });
  try {
    const response = await preprocces(preprocessor, payload);
    if (response.success) {
      dispatch({
        type: types.CREATION_HTML_PREPROCESS_SUCCESS,
        payload: response.code
      });
    } else {
      dispatch({
        type: types.CREATION_HTML_PREPROCESS_ERROR,
        payload: response.error
      });
    }
  } catch (error) {
    dispatch({
      type: types.CREATION_HTML_PREPROCESS_ERROR,
      payload: error
    });
  }
};
