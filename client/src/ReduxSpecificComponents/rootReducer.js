import reviewAverageReducer from './Reducers/reviewAverageReducer.js';
import numberOfReviewsReducer from './Reducers/numberOfReviewsReducer.js';
import allReviewsReducer from './Reducers/allReviewsReducer.js';
import filterReducer from './Reducers/filterReducer.js';
import reviewRangeReducer from './Reducers/reviewRangeReducer.js';
import showRatingFilterReducer from './Reducers/showRatingFilterReducer.js';

const { combineReducers } = Redux;

const rootReducer = combineReducers({
  reviewAverage: reviewAverageReducer,
  numberOfReviews: numberOfReviewsReducer,
  allReviews: allReviewsReducer,
  filter: filterReducer,
  reviewRange: reviewRangeReducer,
  showRatingFilter: showRatingFilterReducer,
});

export default rootReducer;
