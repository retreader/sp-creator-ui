const initialState = [];

const selectedArtistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ARTISTS':
      return action.payload;
    default:
      return state;
  }
};

export default selectedArtistsReducer;
