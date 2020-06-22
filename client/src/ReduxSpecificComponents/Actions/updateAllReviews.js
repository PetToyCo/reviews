const updateAllReviews = function(data) {
  return {
    type: 'UPDATE_ALL_REVIEWS',
    payload: data,
  };
};

export default updateAllReviews;