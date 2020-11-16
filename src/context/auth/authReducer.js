import { LOG_IN, LOG_OUT } from '../types'

const handlers = {
    [LOG_IN]: (state, { payload }) => ({token: payload}),
    [LOG_OUT]: (state) => ({token: null}),
    DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}