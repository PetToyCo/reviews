const reviewAverageReducer = function(state = '', action) {
  if (action.type === 'UPDATE_REVIEW_AVERAGE') {
    return action.payload;
  } else {
    return state;
  }
};

export default reviewAverageReducer;
