const initialState = 10;  // Default to 10 songs

const numSongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NUM_SONGS':
            return action.payload;
        default:
            return state;
    }
};

export default numSongsReducer;