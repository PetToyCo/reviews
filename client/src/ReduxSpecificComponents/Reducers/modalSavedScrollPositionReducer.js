const modalSavedScrollPositionReducer = function(state = [0, 0], action) {
  if (action.type === 'UPDATE_MODAL_SAVED_SCROLL_POSITION') {
    return action.payload;
  } else {
    return state;
  }
};

export default modalSavedScrollPositionReducer;
