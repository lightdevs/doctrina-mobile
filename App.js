import React, { useState, useEffect, useContext } from 'react';
import { LoadingScreen } from './src/screens/LoadingScreen';
import * as Font from 'expo-font';
import { Root } from "native-base";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { getCash} from "./util";
import { AUTH_TOKEN } from "./cashItems";

import { AppNavigation } from "./src/navigations/AppNavigation";
import { QueryProvider } from "./src/context/query/QueryProvider";
import { AuthState } from "./src/context/auth/AuthState";
import { ListCourseState } from "./src/context/data/listCourse/ListCourseState";
import { CourseState } from "./src/context/data/course/CourseState";
import { LessonState } from "./src/context/data/lesson/LessonState";
import { ProfileState } from "./src/context/data/profile/ProfileState";

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

    const uri = { uri: "http://192.168.0.106:5000/graphql" };

    const uploadLink = createUploadLink(uri);

    const authLink = setContext(async (_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: await getCash(AUTH_TOKEN),
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache(),
        credentials: "include"
    });

    if(state.loading){
        return <LoadingScreen/>;
    }

    return (
        <ApolloProvider client={client}>
            <AuthState>
                <ListCourseState>
                    <CourseState>
                        <LessonState>
                            <ProfileState>
                                <QueryProvider>
                                    <Root>
                                        <AppNavigation/>
                                    </Root>
                                </QueryProvider>
                            </ProfileState>
                        </LessonState>
                    </CourseState>
                </ListCourseState>
            </AuthState>
        </ApolloProvider>
    );
}
