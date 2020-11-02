import React, { useReducer } from 'react';
import { ListCourseContext } from "./listCourseContext";
import { listCourseReducer } from "./listCourseReducer";
import { ADD_COURSE_TO_LIST, CLEAR_LIST } from "../../types";

export const ListCourseState = ({children}) =>  {
    const [state, dispatch] = useReducer(listCourseReducer, {courses: [], page: 0, end: true});

    const addCourses = (courses, isEnd) => {
        dispatch({
            type: ADD_COURSE_TO_LIST,
            payload: {courses, isEnd}
        });
    }

    const clearList = () => {
        dispatch({type: CLEAR_LIST});
    }

    return (
        <ListCourseContext.Provider value={{
            listCourseState: state,
            addCourses, clearList
        }}>
            {children}
        </ListCourseContext.Provider>
    )
}