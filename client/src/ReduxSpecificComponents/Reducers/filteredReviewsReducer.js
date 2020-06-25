const filteredReviewsReducer = function(state = [], action) {
  if (action.type === 'UPDATE_FILTERED_REVIEWS') {
    return action.payload;
  } else {
    return state;
  }
};

export default filteredReviewsReducer;
