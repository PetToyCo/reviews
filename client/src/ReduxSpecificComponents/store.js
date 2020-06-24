import rootReducer from './rootReducer.js';

const { createStore } = Redux;

const store = createStore(rootReducer, {
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
});

export default store;
