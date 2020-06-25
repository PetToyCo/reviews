const showRatingFilterDropDownReducer = function(state = false, action) {
  if (action.type === 'UPDATE_SHOW_RATING_FILTER_DROP_DOWN') {
    return action.payload;
  } else {
    return state;
  }
};

export default showRatingFilterDropDownReducer;
