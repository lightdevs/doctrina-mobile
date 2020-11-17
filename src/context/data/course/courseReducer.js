import {SET_COURSE_TEACHER, SET_COURSE, SET_LESSONS, SET_COURSE_MATERIALS, SET_COURSE_LINKS} from "../../types";

const handlers = {
    [SET_COURSE]: (state, {payload}) => ({...payload, links: [], lessons: [], materials: [], infoTeacher: ""}),
    [SET_COURSE_TEACHER]: (state, {payload}) => ({...state, infoTeacher: `${payload.name} ${payload.surname}`}),
    [SET_LESSONS]: (state, {payload}) => ({...state, lessons: payload}),
    [SET_COURSE_MATERIALS]: (state, {payload}) => ({...state, materials: payload}),
    [SET_COURSE_LINKS]: (state, {payload}) => ({...state, links: payload}),
    DEFAULT: state => state
}

export const courseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}