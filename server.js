import config from './config';
// import apiRouter from './api';

import express from 'express';
const server = express();

server.get('/', (req, res) => {
  res.send('Hello Express');
});

// server.use('/api', apiRouter);
server.use(express.static('build'));

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
