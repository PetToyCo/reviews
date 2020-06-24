const showRatingFilterReducer = function(state = false, action) {
  if (action.type === 'UPDATE_SHOW_RATING_FILTER') {
    return !state;
  } else {
    return state;
  }
};

export default showRatingFilterReducer;
