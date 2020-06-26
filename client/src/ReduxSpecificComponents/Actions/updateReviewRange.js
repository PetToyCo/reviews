const updateReviewRange = function(option, data, numberOfReviews) {
  return {
    type: 'UPDATE_REVIEW_RANGE',
    payload: data,
    option,
    numberOfReviews,
  };
};

export default updateReviewRange;
