import React, { useReducer, useContext } from 'react';
import { Toast } from "native-base";
import { AuthContext } from "./authContext";
import { QueryContext } from "../query/queryContext";
import { authReducer } from "./authReducer";
import { setToken } from "../../../util";
import { LOG_IN, LOG_OUT } from '../types';

export const AuthState = ({children}) => {
    const [isSignIn, dispatch] = useReducer(authReducer, false);
    const {login, register} = useContext(QueryContext);

    const signIn = (options) => {
        const {data, error, loading} = login(options);
        if(loading){
            return Toast.show({
                text: "Loading..."
            })
        }
        if(error){
            return Toast.show({
                text: error.message
            })
        }
        if(!data){
            return Toast.show({
                text: "No data"
            })
        }

        setToken(data.token);
        dispatch({type: LOG_IN});
    }

    const signUp = (options) => {
        const {data, error, loading} = register(options);
        dispatch({type: LOG_IN});
    }

    const signOut = () => {
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