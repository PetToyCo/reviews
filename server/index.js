const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const db = require('./db.js');
const { IP_ADDRESS, IP_ADDRESS_E, IP_ADDRESS_K } = require('./enviromentalVariables.js');

const server = express();

server.use(morgan('dev'));
server.use(function(req, res, next) {
  const { referer } = req.headers;

  if (referer) {
    if (referer.includes(`http://${IP_ADDRESS}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_E}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_E}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_K}:3000`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_K}:3000`);
    } else if (referer.includes(`http://${IP_ADDRESS_E}:3005`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS_E}:3005`);
    } else if (referer.includes(`http://${IP_ADDRESS}:3004`)) {
      res.header('Access-Control-Allow-Origin', `http://${IP_ADDRESS}:3004`);
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
