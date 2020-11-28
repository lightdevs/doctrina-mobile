import React, { useReducer, useEffect } from 'react';
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { LOG_IN, LOG_OUT } from '../types';
import { setCash, removeCash } from "../../../util";
import {AUTH_TOKEN, USER_ID} from "../../../cashItems";

export const AuthState = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {token: null, id: null});

    const signIn = (params) => {
        setCash(AUTH_TOKEN, params.token)
            .catch();
        setCash(USER_ID, params.id)
            .catch();
        dispatch({
            type: LOG_IN,
            payload: params
        });
    }

    const signOut = () => {
        removeCash(AUTH_TOKEN)
            .catch();
        removeCash(USER_ID)
            .catch();
        dispatch({type: LOG_OUT});
    }

    return (
        <AuthContext.Provider value={{
            signIn, signOut,
            auth: state
        }}>
            {children}
        </AuthContext.Provider>
    );
}