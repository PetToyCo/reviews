const updateEnteredRatingFilterDropDown = function(data) {
  return {
    type: 'UPDATE_ENTERED_RATING_FILTER_DROP_DOWN',
    payload: data,
  };
};

export default updateEnteredRatingFilterDropDown;
