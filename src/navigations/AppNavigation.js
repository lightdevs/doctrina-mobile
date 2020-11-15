import 'react-native-gesture-handler';
import React, {useContext} from 'react';

import {getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTab } from './BottomTab';
import { AuthScreen } from "../screens/AuthScreen";

import { AuthContext } from "../context/auth/authContext";

const Stack = createStackNavigator();

export const AppNavigation = () => {
    const { auth } = useContext(AuthContext);

    const getHeaderTitle = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';

        switch (routeName){
            case 'Profile':
                return 'Profile';
            case 'Courses':
                return 'Courses';
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !!auth.token?
                        <Stack.Screen
                            name="Main"
                            component={BottomTab}
                            options={({route}) => ({
                                headerTitle: getHeaderTitle(route)
                            })}
                        />
                    :
                        <Stack.Screen
                            name="Auth"
                            component={AuthScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}