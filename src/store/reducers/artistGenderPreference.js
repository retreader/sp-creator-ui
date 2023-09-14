const initialState = '';

const artistGenderPreferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTIST_GENDER_PREFERENCE':
      return action.payload;
    default:
      return state;
  }
};

export default artistGenderPreferenceReducer;
