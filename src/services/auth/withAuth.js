import React, { useEffect, useReducer } from "react";
import Auth from "./auth";
import { AuthContext } from "./authContext";
import { getUser } from "services/users";

export const withAuth = (Component) => (props) => {
  const initialState = {
    isLoaded: false,
    user: null,
  };

  const [auth, setAuth] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );

  useEffect(() => {
    return Auth.onStateChanged(async (user) => {
      let currentUser = user;
      if (currentUser) {
        try {
          const { notFound, ...userDetails } = await getUser(currentUser.uid);
          if (!notFound) {
            currentUser = {
              uid: currentUser.uid,
              ...userDetails,
            };
          }
        } catch (error) {}
      }
      setAuth({ isLoaded: true, user: currentUser });
    });
  }, []);

  const store = {
    ...auth,
    setUser: (user) => setAuth({ user }),
  };

  return (
    <AuthContext.Provider value={store}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};
