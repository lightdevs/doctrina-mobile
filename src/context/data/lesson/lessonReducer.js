import {SET_LESSON, SET_LESSON_LINKS, SET_LESSON_MATERIALS} from "../../types";

const handlers = {
    [SET_LESSON]: (state, {payload}) => ({...payload, links: [], materials: [], infoTeacher: ""}),
    [SET_LESSON_MATERIALS]: (state, {payload}) => ({...state, materials: payload}),
    [SET_LESSON_LINKS]: (state, {payload}) => ({...state, links: payload}),
    DEFAULT: state => state
}

export const lessonReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}