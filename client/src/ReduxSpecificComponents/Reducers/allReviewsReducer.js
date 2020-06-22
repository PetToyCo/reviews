const allReviewsReducer = function(state, action) {
  if (action.type === 'UPDATE_ALL_REVIEWS') {
    return action.payload;
  } else {
    return state;
  }
};

export default allReviewsReducer;