const exitedRatingFilterReducer = function(state = false, action) {
  if (action.type === 'UPDATE_EXITED_RATING_FILTER') {
    return action.payload;
  } else {
    return state;
  }
};

export default exitedRatingFilterReducer;
