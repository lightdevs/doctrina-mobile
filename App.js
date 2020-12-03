import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './src/screens/LoadingScreen';
import * as Font from 'expo-font';
import { Root } from "native-base";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { getCash} from "./util";
import { AUTH_TOKEN } from "./cashItems";

import { AppNavigation } from "./src/navigations/AppNavigation";
import { AuthState } from "./src/context/auth/AuthState";
import { nameServer } from "./src/config";


export default function App() {
    const [state, setState] = useState({loading: true});

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })
            .then(() => setState({loading: false}))
            .catch(() => {});
    }, []);

    const uri = { uri: `${nameServer}/graphql` };

    const uploadLink = createUploadLink(uri);

    const authLink = setContext(async () => {
        return {
            headers: {
                authorization: await getCash(AUTH_TOKEN),
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache({
            typePolicies:{
                Query:{
                    fields:{
                        personById: {
                            keyArgs: false,
                            merge(exciting= {}, incoming){
                                if(incoming.courses){
                                    let courses = exciting.courses || [];
                                    courses = [...courses, ...incoming.courses];
                                    return {
                                        ...incoming,
                                        courses
                                    }
                                }
                                return exciting
                            }
                        }
                    }
                }
            }
        }),
        credentials: "include"
    });

    if(state.loading){
        return <LoadingScreen/>;
    }

    return (
        <ApolloProvider client={client}>
            <AuthState>
                <Root>
                    <AppNavigation/>
                </Root>
            </AuthState>
        </ApolloProvider>
    );
}
