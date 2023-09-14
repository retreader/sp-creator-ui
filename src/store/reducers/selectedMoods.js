const initialState = [];

const selectedMoodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOODS':
      return action.payload;
    default:
      return state;
  }
};

export default selectedMoodsReducer;
