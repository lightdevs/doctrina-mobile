import React, { useReducer, useState } from 'react';
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { LOG_IN, LOG_OUT } from '../types';
import { setCash, removeCash } from "../../../util";
import { AUTH_TOKEN } from "../../../cashItems";

export const AuthState = ({children}) => {
    const [isSignIn, dispatch] = useReducer(authReducer, false);
    const [data, setData] = useState(null);

    const signIn = async (token) => {
        await setCash(AUTH_TOKEN, token);
        dispatch({type: LOG_IN});
    }

    const signOut = async () => {
        await removeCash();
        dispatch({type: LOG_OUT});
    }

    return (
        <AuthContext.Provider value={{
            signIn, signOut,
            isSignIn
        }}>
            {children}
        </AuthContext.Provider>
    );
}