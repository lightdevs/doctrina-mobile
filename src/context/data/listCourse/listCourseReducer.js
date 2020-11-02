import { ADD_COURSE_TO_LIST, CLEAR_LIST } from "../../types";

const handlers = {
    [ADD_COURSE_TO_LIST]: (state, {payload}) => ({courses: [...state.courses, ...payload.courses], page: state.page++, end: payload.isEnd}),
    [CLEAR_LIST]: state => ({courses: [], page: 0, end: true}),
    DEFAULT: state => state
}

export const listCourseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}