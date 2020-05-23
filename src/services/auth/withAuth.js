import React, { useEffect, useReducer } from "react";
import Auth from "./auth"; 
import { AuthContext } from "./authContext";

export const withAuth = ( Component ) => (props) => {
    const initialState = {
        isLoaded: false,
        user: null,
    }

    const [ auth, setAuth ] = useReducer(
        (state, newState) => ({...state, ...newState}),
        (initialState))

    useEffect(() => {
        return Auth.onStateChanged( user => {
             setAuth({isLoaded: true, user}) 
        });
    }, [])
    return (
        <AuthContext.Provider value={auth}>
            <Component {...props} />
        </AuthContext.Provider>
    )
}