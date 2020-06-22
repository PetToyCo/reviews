const numberOfReviewsReducer = function(state, action) {
  if (action.type === 'UPDATE_NUMBER_OF_REVIEWS') {
    return action.payload;
  } else {
    return state;
  }
};

export default numberOfReviewsReducer;