import React, { useReducer, useEffect } from 'react';
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { LOG_IN, LOG_OUT } from '../types';
import {setCash, removeCash, getCash} from "../../../util";
import { AUTH_TOKEN } from "../../../cashItems";

export const AuthState = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {token: null});

    const signIn = (token) => {
        setCash(AUTH_TOKEN, token)
            .catch();
        dispatch({
            type: LOG_IN,
            payload: token
        });
    }

    // useEffect(() => {
    //     if(!!getCash(AUTH_TOKEN)){
    //         signIn(getCash(AUTH_TOKEN));
    //     }
    // }, []);

    const signOut = async () => {
        await removeCash(AUTH_TOKEN);
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