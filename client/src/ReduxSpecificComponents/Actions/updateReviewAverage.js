const updateReviewAverage = function(data) {
  return {
    type: 'UPDATE_REVIEW_AVERAGE',
    payload: data,
  };
};

export default updateReviewAverage;
