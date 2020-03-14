import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import app from "./app/reducer";
import creation from "./creation/reducer";

import {
  reduxFirestore,
  getFirestore,
  firestoreReducer
} from "redux-firestore";
import { getFirebase, firebaseReducer } from "react-redux-firebase";
import firebaseConfig from "./../config/firebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  app,
  creation,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirestore,
        getFirebase
      })
    ),
    reduxFirestore(firebaseConfig)
  )
);

export default store;
