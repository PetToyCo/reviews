const storeStartingState = {
  reviewAverage: '',
  numberOfReviews: null,
  allReviews: [],
  filter: {
    '5': false,
    '4': false,
    '3': false,
    '2': false,
    '1': false,
    'MostRecent': true,
    'MostHelpful': false,
    'HighToLow': false,
    'LowToHigh': false,
  },
  reviewRange: [0, 7],
  showRatingFilter: false,
  exitedRatingFilter: false,
  showRatingFilterDropDown: false,
  enteredRatingFilterDropDown: false,
  filteredReviews: [],
  showNonNumberFilterSetting: false,
  exitedNonNumberFilterDropDownSource: false,
  enteredNonNumberFilterSetting: false,
};

export default storeStartingState;
