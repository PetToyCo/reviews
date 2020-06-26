const reviewRangeReducer = function(state = [0, 7], action) {
  if (action.type === 'UPDATE_REVIEW_RANGE') {
    if (action.option === 'RESET') {
      return action.payload;
    }

    const newState = state.slice();

    if (action.option === 'FORWARD') {
      newState[0] = newState[1] + 1;
      newState[1] += 30;

      if (newState[1] > action.numberOfReviews - 1) {
        newState[1] = action.numberOfReviews - 1;
      }
    }

    if (action.option === 'BACK') {
      newState[0] -= 30;
      newState[1] -= 30;

      if (newState[0] < 0) {
        newState[0] = 0;
        newState[1] = 7;
      }
    }

    return newState;
  } else {
    return state;
  }
};

export default reviewRangeReducer;
