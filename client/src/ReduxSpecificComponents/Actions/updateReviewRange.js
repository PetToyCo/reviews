const updateReviewRange = function(data) {
  return {
    type: 'UPDATE_REVIEW_RANGE',
    payload: data,
  };
};

export default updateReviewRange;
