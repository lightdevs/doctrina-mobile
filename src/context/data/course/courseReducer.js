import {SET_TEACHER, SET_COURSE, SET_LESSONS, SET_COURSE_MATERIALS} from "../../types";

const handlers = {
    [SET_COURSE]: (state, {payload}) => ({...payload, lessons: [], materials: [], infoTeacher: ""}),
    [SET_TEACHER]: (state, {payload}) => ({...state, infoTeacher: `${payload.name} ${payload.surname}`}),
    [SET_LESSONS]: (state, {payload}) => ({...state, lessons: payload}),
    [SET_COURSE_MATERIALS]: (state, {payload}) => ({...state, materials: payload}),
    DEFAULT: state => state
}

export const courseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}