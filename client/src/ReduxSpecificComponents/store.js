import rootReducer from './rootReducer.js';

const { createStore } = Redux;

const store = createStore(rootReducer, {
  reviewAverage: '',
  numberOfReviews: null,
  allReviews: [],
});

export default store;
