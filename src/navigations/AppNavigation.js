import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "../screens/AuthScreen";
import { CourseScreen } from "../screens/CourseScreen";
import { ListCourseScreen } from "../screens/ListCourseScreen";

import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../context/auth/authContext";

const Stack = createStackNavigator();

export const AppNavigation = () => {
    const { auth } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !!auth.token?
                        <>
                            <Stack.Screen name="ListCourse" component={ListCourseScreen}/>
                            <Stack.Screen name="Course" component={CourseScreen}/>
                        </>
                    :
                        <>
                            <Stack.Screen name="Auth" component={AuthScreen}/>
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}