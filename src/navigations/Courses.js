import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

import { ListCourseScreen } from "../screens/ListCourseScreen";
import { CourseScreen } from "../screens/CourseScreen";
import { LessonScreen } from "../screens/LessonScreen";
import { TaskScreen } from "../screens/TaskScreen";

const Stack = createStackNavigator();

export const Courses = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListCourse"
                component={ListCourseScreen}
            />
            <Stack.Screen
                name="Course"
                component={CourseScreen}
            />
            <Stack.Screen
                name="Lesson"
                component={LessonScreen}
            />
            <Stack.Screen
                name="Task"
                component={TaskScreen}
            />
        </Stack.Navigator>
    )
}