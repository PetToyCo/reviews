const updateFilteredReviews = function(data, option) {
  return {
    type: 'UPDATE_FILTERED_REVIEWS',
    payload: data,
    option,
  };
};

export default updateFilteredReviews;
