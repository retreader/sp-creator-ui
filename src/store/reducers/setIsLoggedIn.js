const initialState = false;

const isLoggedInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return action.payload;
        default:
            return state;
    }
};

export default isLoggedInReducer;
