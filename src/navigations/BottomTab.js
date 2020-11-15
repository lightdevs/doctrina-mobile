import React from 'react';
import { Icon } from "native-base";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProfileScreen } from "../screens/ProfileScreen";
import { Courses } from "./Courses";

const Tab = createBottomTabNavigator();

export const BottomTab = () => {


    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Icon type={"MaterialCommunityIcons"} name={"account-circle"}/>
                }}
            />
            <Tab.Screen
                name="Courses"
                component={Courses}
                options={{
                    tabBarIcon: () => <Icon type={"MaterialCommunityIcons"} name={"book-open-page-variant"}/>
                }}
            />
        </Tab.Navigator>
    )
}