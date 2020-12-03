import React, { useReducer, useEffect, useCallback } from 'react';
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";
import { LOG_IN, LOG_OUT } from '../types';
import {setCash, removeCash, getCash} from "../../../util";
import {AUTH_TOKEN, USER_ID} from "../../../cashItems";

export const AuthState = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {token: null, id: null});

    // useEffect(useCallback(() => {
    //     getCash(AUTH_TOKEN)
    //         .then((value => {
    //             if(value){
    //                 (async () => {
    //                     signIn({token: await getCash(AUTH_TOKEN), id: await getCash(USER_ID)});
    //                 })()
    //             }
    //         }))
    //
    // }, []))

    const signIn = ({token, id}) => {
        setCash(AUTH_TOKEN, token)
            .then(() => {
                dispatch({
                    type: LOG_IN,
                    payload: {token, id}
                });
            })
        setCash(USER_ID, id)
            .catch();
    }

    const signOut = () => {
        removeCash(AUTH_TOKEN)
            .then(() => {
                dispatch({type: LOG_OUT});
            })
        removeCash(USER_ID)
            .catch();
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