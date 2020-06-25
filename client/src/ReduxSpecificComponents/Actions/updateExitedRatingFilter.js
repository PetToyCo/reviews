const updateExitedRatingFilter = function(data) {
  return {
    type: 'UPDATE_EXITED_RATING_FILTER',
    payload: data,
  };
};

export default updateExitedRatingFilter;
