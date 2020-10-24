import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QueryContext } from "./queryContext";
import { REGISTER, LOGIN } from "./query"

export const QueryProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const registerMutation = async (options) => {
        const [register, {data, error, loading}] = await useMutation(REGISTER);

        await register({variables: options.var});

        return {data, error, loading};
    }

    const loginMutation = async (options) => {
        const [login, {data, error, loading}] = await useMutation(LOGIN);

        await login({variables: options.var});

        return {data, error, loading};
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