import { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from '../actions/actions';

const initialState = '';

const errorMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return action.payload;
        case CLEAR_ERROR_MESSAGE:
            return initialState;
        default:
            return state;
    }
};

export default errorMessageReducer;
