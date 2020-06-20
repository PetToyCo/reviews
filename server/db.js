const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PTCReviewsService');

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
  return AggregateReview.findOne({ itemId }).exec();
};

const retrieveIndividualReview = function(reviewId) {
  return IndividualReview.findOne({ reviewId }).exec();
};

module.exports.db = db;
module.exports.retrieveAggregateReview = retrieveAggregateReview;
module.exports.retrieveIndividualReview = retrieveIndividualReview;
module.exports.AggregateReview = AggregateReview;
module.exports.IndividualReview = IndividualReview;
