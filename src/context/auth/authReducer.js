import { LOG_IN, LOG_OUT } from '../types'

const handlers = {
    [LOG_IN]: state => true,
    [LOG_OUT]: state => false,
    DEFAULT: state => state
}

export const authReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}