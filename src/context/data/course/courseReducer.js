import {SET_TEACHER, SET_COURSE} from "../../types";

const handlers = {
    [SET_COURSE]: (state, {payload}) => ({...payload}),
    [SET_TEACHER]: (state, {payload}) => ({...state, teacher: `${payload.surname} ${payload.name}`}),
    DEFAULT: state => state
}

export const courseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}