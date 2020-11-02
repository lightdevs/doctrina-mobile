import React, { useState, useEffect, useContext } from 'react';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Root, Toast } from "native-base";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
    concat
} from "@apollo/client";

import { getCash} from "./util";
import { AUTH_TOKEN } from "./cashItems";

import { AppNavigation } from "./src/navigations/AppNavigation";
import { QueryProvider } from "./src/context/query/QueryProvider";
import { AuthState } from "./src/context/auth/AuthState";
import { ListCourseState } from "./src/context/data/listCourse/ListCourseState";
import { CourseState } from "./src/context/data/course/CourseState";

export default function App() {
    const [state, setState] = useState({loading: false});

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        })
            .then(() => setState({loading: true}))
            .catch(() => {});
    }, []);

    const httpLink = new HttpLink({ uri: "http://192.168.0.106:5000/graphql" });

    const authMiddleware = new ApolloLink(async (operation, forward) => {
        operation.setContext({
            headers: {
                authorization: await getCash(AUTH_TOKEN),
            }
        });

        return forward(operation);
    })

    const client = new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache(),
        credentials: "include"
    });

    if(!state.loading){
        return <AppLoading/>;
    }

    return (
        <ApolloProvider client={client}>
            <AuthState>
                <ListCourseState>
                    <CourseState>
                        <QueryProvider>
                            <Root>
                                <AppNavigation/>
                            </Root>
                        </QueryProvider>
                    </CourseState>
                </ListCourseState>
            </AuthState>
        </ApolloProvider>
    );
}
