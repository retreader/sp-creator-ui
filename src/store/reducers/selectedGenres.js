// src/redux/reducers/selectedGenresReducer.js

const initialState = [];

const selectedGenresReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_GENRES':
      return action.payload;
    default:
      return state;
  }
};

export default selectedGenresReducer;
