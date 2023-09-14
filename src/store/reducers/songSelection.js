const initialState = {songs: []};

const songSelectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SONG_SELECTIONS':
      return action.payload;
    default:
      return state;
  }
};

export default songSelectionsReducer;
