const initialState = '';

const selectedActivitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
};

export default selectedActivitiesReducer;
