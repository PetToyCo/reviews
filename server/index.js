const express = require('express');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const db = require('./db.js');

const server = express();

server.use(morgan('dev'));
server.use(serveStatic('../client/public'));

server.get('/averageReviews/:itemId', (req, res) => {});

server.get('/reviews/:itemId', (req, res) => {});

server.listen(3001);
