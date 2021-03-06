const mongoose = require('mongoose');
const { DATABASE_LOCAL_ADDRESS } = require('./enviromentalVariables.js');

mongoose.connect(`mongodb://${DATABASE_LOCAL_ADDRESS}/PTCReviewsService`);

const db = mongoose.connection;

const aggregateReviewsSchema = new mongoose.Schema({
  itemId: String,
  reviewAverage: String,
  numberOfReviews: Number,
  allReviews: [Number],
});

const individualReviewsSchema = new mongoose.Schema({
  reviewId: Number,
  score: Number,
  date: String,
  title: String,
  review: String,
  username: String,
  recommended: Boolean,
  yeses: Number,
  noes: Number,
  verified: Boolean,
  promotion: Boolean,
});

const AggregateReview = mongoose.model('Aggregate_Review', aggregateReviewsSchema);
const IndividualReview = mongoose.model('Individual_Review', individualReviewsSchema);

const retrieveAggregateReview = function(itemId) {
  return AggregateReview.findOne({ itemId }).select('-_id -itemId -__v').exec();
};

const retrieveAggregateReviews = function(itemIds) {
  return AggregateReview.find({ itemId: { $in: itemIds } }).select('-_id -allReviews -__v').exec();
};

const retrieveIndividualReviews = function(reviewIds) {
  return IndividualReview.find({ reviewId: { $in: reviewIds } }).select('-_id -reviewId -__v').sort({ date: -1 }).exec();
};

module.exports.db = db;
module.exports.retrieveAggregateReview = retrieveAggregateReview;
module.exports.retrieveIndividualReviews = retrieveIndividualReviews;
module.exports.retrieveAggregateReviews = retrieveAggregateReviews;
module.exports.AggregateReview = AggregateReview;
module.exports.IndividualReview = IndividualReview;
