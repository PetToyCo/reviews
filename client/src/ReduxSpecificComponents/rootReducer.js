import reviewAverageReducer from './Reducers/reviewAverageReducer.js';
import numberOfReviewsReducer from './Reducers/numberOfReviewsReducer.js';
import allReviewsReducer from './Reducers/allReviewsReducer.js';

const { combineReducers } = Redux;

const rootReducer = combineReducers({
  reviewAverage: reviewAverageReducer,
  numberOfReviews: numberOfReviewsReducer,
  allReviews: allReviewsReducer,
});

export default rootReducer;
