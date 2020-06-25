const updateFilteredReviews = function(data) {
  return {
    type: 'UPDATE_FILTERED_REVIEWS',
    payload: data,
  };
};

export default updateFilteredReviews;
