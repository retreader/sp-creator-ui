const initialState = { songs: [] };

const selectedSongs = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_SONGS':
      return action.payload;
    default:
      return state;
  }
};

export default selectedSongs;
