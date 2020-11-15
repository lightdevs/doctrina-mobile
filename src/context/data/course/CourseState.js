import React, { useReducer } from 'react';
import { courseReducer } from "./courseReducer";
import {CourseContext} from "./courseContext";
import {SET_COURSE, SET_TEACHER} from "../../types";

export const CourseState = ({children}) => {
    const [state, dispatch] = useReducer(courseReducer, {});

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

    return (
        <CourseContext.Provider value={{
            courseState: state,
            setTeacher, setCourse
        }}>
            {children}
        </CourseContext.Provider>
    )
}