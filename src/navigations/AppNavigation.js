import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "../screens/AuthScreen";
import {CourseScreen} from "../screens/CourseScreen";

import {createStackNavigator} from "@react-navigation/stack";
import {AuthContext} from "../context/auth/authContext";

const Stack = createStackNavigator();

export const AppNavigation = () => {
    const { isSignIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    isSignIn?
                        <>
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