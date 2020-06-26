const updateReviewRange = function(option, data) {
  return {
    type: 'UPDATE_REVIEW_RANGE',
    payload: data,
    option,
  };
};

export default updateReviewRange;
