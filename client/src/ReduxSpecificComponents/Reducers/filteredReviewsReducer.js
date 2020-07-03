const filteredReviewsReducer = function(state = [], action) {
  if (action.type === 'UPDATE_FILTERED_REVIEWS') {
    if (action.option) {
      const newState = state.slice();
      newState[action.payload].disabled = true;
      return newState;
    } else {
      return action.payload;
    }
  } else {
    return state;
  }
};

export default filteredReviewsReducer;
