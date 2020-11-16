import React, { useReducer } from 'react';
import { courseReducer } from "./courseReducer";
import {CourseContext} from "./courseContext";
import {SET_COURSE, SET_COURSE_MATERIALS, SET_LESSONS, SET_TEACHER} from "../../types";

export const CourseState = ({children}) => {
    const [state, dispatch] = useReducer(courseReducer, {links: [], lessons: [], materials: [], infoTeacher: ""});

    const setTeacher = (teacher) => {
        dispatch({
            type: SET_TEACHER,
            payload: teacher
        });
    }

    const setCourse = (course) => {
        dispatch({
            type: SET_COURSE,
            payload: course
        });
    }

    const setCourseLessons = (lessons) => {
        dispatch({
            type: SET_LESSONS,
            payload: lessons
        })
    }

    const setCourseMaterials = (materials) => {
        dispatch({
            type: SET_COURSE_MATERIALS,
            payload: materials
        })
    }

    return (
        <CourseContext.Provider value={{
            courseState: state,
            setTeacher, setCourse, setCourseLessons, setCourseMaterials
        }}>
            {children}
        </CourseContext.Provider>
    )
}