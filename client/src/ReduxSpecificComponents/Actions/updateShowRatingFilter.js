const updateShowRatingFilter = function(data) {
  return {
    type: 'UPDATE_SHOW_RATING_FILTER',
    payload: data,
  };
};

export default updateShowRatingFilter;
