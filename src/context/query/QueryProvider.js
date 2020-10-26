import React, { useContext } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QueryContext } from "./queryContext";
import { AuthContext } from "../auth/authContext";
import { DataContext } from "../data/dataContext";
import { REGISTER, LOGIN } from "./query"
import { setCash } from "../../../util";
import { USER_EMAIL, USER_NAME, USER_SURNAME } from "../../../cashItems";

export const QueryProvider = ({children}) => {
    const { signIn } = useContext(AuthContext);
    const { setData } = useContext(DataContext);

    const [register] = useMutation(REGISTER, {
        onCompleted: ((data) => {
            if(data.register){
                setCash(USER_EMAIL, data.register.email);
                setCash(USER_NAME, data.register.name);
                setCash(USER_SURNAME, data.register.surname);
                signIn(data.register.token);
            }
        })
    });

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if(data.login){
                signIn(data.login.token)
            }
        }
    });

    const registerMutation = async ({variables}) => {
        await register({variables: variables});
    }

    const loginMutation = async ({variables}) => {
        await login({variables: variables});
    }

    return (
        <QueryContext.Provider value={{
            login: loginMutation,
            register: registerMutation
        }}>
            {children}
        </QueryContext.Provider>
    )
}