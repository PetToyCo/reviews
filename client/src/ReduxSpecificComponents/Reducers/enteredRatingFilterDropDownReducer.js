const enteredRatingFilterDropDownReducer = function(state = false, action) {
  if (action.type === 'UPDATE_ENTERED_RATING_FILTER_DROP_DOWN') {
    return action.payload;
  } else {
    return state;
  }
};

export default enteredRatingFilterDropDownReducer;
