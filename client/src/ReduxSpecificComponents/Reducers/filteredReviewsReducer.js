const filteredReviewsReducer = function(state = [], action) {
  if (action.type === 'UPDATE_FILTERED_REVIEWS') {
    if (action.option === 'UPDATE_REVIEW_OBJECT') {
      const newState = state.slice();
      newState[action.payload].disabled = true;
      newState[action.payload][action.yesOrNo]++;
      return newState;
    } else {
      return action.payload;
    }
  } else {
    return state;
  }
};

export default filteredReviewsReducer;
