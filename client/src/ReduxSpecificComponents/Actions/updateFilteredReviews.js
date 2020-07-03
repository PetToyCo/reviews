const updateFilteredReviews = function(data, yesOrNo, option) {
  return {
    type: 'UPDATE_FILTERED_REVIEWS',
    payload: data,
    yesOrNo,
    option,
  };
};

export default updateFilteredReviews;
