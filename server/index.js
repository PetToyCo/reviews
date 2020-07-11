const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const db = require('./db.js');

const server = express();

server.use(morgan('dev'));
server.use(function(req, res, next) {
  const { referer } = req.headers;

  if (referer) {
    if (referer.includes('http://127.0.0.1:3000')) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    } else if (referer.includes('http://127.0.0.1:3005')) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3005');
    } else if (referer.includes('http://127.0.0.1:3004')) {
      res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3004');
    }
  }
  next();
});
server.use(serveStatic('./client/public'));
server.use('/test', serveStatic('./test'));

server.get('/averageReviews/:itemId', (req, res) => {
  const { itemId } = req.params;

  db.retrieveAggregateReview(itemId)
    .then((data) => {
      if (data) {
        const { reviewAverage, numberOfReviews } = data;
        res.status(200).send({ reviewAverage, numberOfReviews });
      } else {
        res.status(404).send('Item does not exist');
      }
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
      if (data) {
        const { allReviews } = data;
        aggregateReview = data;

        return db.retrieveIndividualReviews(allReviews);
      } else {
        res.status(404).send('Item does not exist');
        return null;
      }
    })
    .then((data) => {
      if (data) {
        const { reviewAverage, numberOfReviews } = aggregateReview;
        res.status(200).send({ reviewAverage, numberOfReviews, allReviews: data });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

server.listen(3001);
