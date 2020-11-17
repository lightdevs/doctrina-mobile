import React, { useReducer } from 'react';
import { lessonReducer } from "./lessonReducer";
import {LessonContext} from "./lessonContext";
import {
    SET_LESSON_LINKS,
    SET_LESSON_MATERIALS,
    SET_LESSON
} from "../../types";

export const LessonState = ({children}) => {
    const [state, dispatch] = useReducer(lessonReducer, {
        links: [],
        materials: []
    });

    const setLesson = (lesson) => {
        dispatch({
            type: SET_LESSON,
            payload: lesson
        });
    }

    const setLessonMaterials = (materials) => {
        dispatch({
            type: SET_LESSON_MATERIALS,
            payload: materials
        })
    }

    const setLessonLinks = (links) => {
        dispatch({
            type: SET_LESSON_LINKS,
            payload: links
        })
    }

    return(
        <LessonContext.Provider value={{
            lessonState: state, setLesson, setLessonLinks, setLessonMaterials
        }}>
            {children}
        </LessonContext.Provider>
    )
}
