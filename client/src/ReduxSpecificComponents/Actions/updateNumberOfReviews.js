const updateNumberOfReviews = function(data) {
  return {
    type: 'UPDATE_NUMBER_OF_REVIEWS',
    payload: data,
  };
};

export default updateNumberOfReviews;