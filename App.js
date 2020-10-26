import React, { useState, useEffect } from 'react';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Root } from "native-base";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";

import { getCash } from "./util";
import { AUTH_TOKEN } from "./cashItems";

import { AppNavigation } from "./src/navigations/AppNavigation";
import { QueryProvider } from "./src/context/query/QueryProvider";
import { AuthState } from "./src/context/auth/AuthState";
import { DataState } from "./src/context/data/DataState";

export default function App() {
    const [state, setState] = useState({loading: false});

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })
            .then(() => setState({loading: true}))
            .catch(() => {})
    }, []);

    const client = new ApolloClient({
        uri: "http://192.168.0.106:5000/graphql",
        cache: new InMemoryCache(),
        headers: {
            authorization: getCash(AUTH_TOKEN)
        },
        credentials: 'include'
    });

    if(!state.loading){
        return <AppLoading/>;
    }

    return (
        <ApolloProvider client={client}>
            <AuthState>
                <DataState>
                    <QueryProvider>
                        <Root>
                            <AppNavigation/>
                        </Root>
                    </QueryProvider>
                </DataState>
            </AuthState>
        </ApolloProvider>
    );
}
