const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const db = require('./db.js');

const server = express();

server.use(morgan('dev'));
server.use(serveStatic('./client/public'));
server.use('/test', serveStatic('./test'));

server.get('/averageReviews/:itemId', (req, res) => {
  const { itemId } = req.params;

  db.retrieveAggregateReview(itemId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

server.get('/reviews/:itemId', (req, res) => {
  const { itemId } = req.params;
  let aggregateReview;

  db.retrieveAggregateReview(itemId)
    .then((data) => {
      const { allReviews } = data;
      aggregateReview = data;

      return db.retrieveIndividualReviews(allReviews);
    })
    .then((data) => {
      const { reviewAverage, numberOfReviews } = aggregateReview;
      res.status(200).send({ reviewAverage, numberOfReviews, allReviews: data });
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

server.listen(3001);
