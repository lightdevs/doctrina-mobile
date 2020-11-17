import React, { useReducer } from 'react';
import { courseReducer } from "./courseReducer";
import {CourseContext} from "./courseContext";
import {SET_COURSE, SET_COURSE_LINKS, SET_COURSE_MATERIALS, SET_LESSONS, SET_COURSE_TEACHER} from "../../types";

export const CourseState = ({children}) => {
    const [state, dispatch] = useReducer(courseReducer, {
        links: [],
        lessons: [],
        materials: [],
        infoTeacher: ""
    });

    const setCourse = (course) => {
        dispatch({
            type: SET_COURSE,
            payload: course
        });
    }

    const setTeacher = (teacher) => {
        dispatch({
            type: SET_COURSE_TEACHER,
            payload: teacher
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

    const setCourseLinks = (links) => {
        dispatch({
            type: SET_COURSE_LINKS,
            payload: links
        })
    }

    return (
        <CourseContext.Provider value={{
            courseState: state,
            setTeacher,
            setCourse,
            setCourseLessons,
            setCourseMaterials,
            setCourseLinks
        }}>
            {children}
        </CourseContext.Provider>
    )
}