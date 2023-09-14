const initialState = {
  isModalOpen: false,
  modalOpen: false
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
};

export default modal;
