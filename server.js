import config from './config';
import apiRouter from './api';
import express from 'express';
import serverRender from './serverRender';

const server = express();

server.set('view engine', 'ejs');


server.get('/', (req, res) => {
  serverRender().then(({initialMarkup, initialNavigation}) => {
    res.render('index', {
      initialMarkup,
      initialNavigation
      // content: 'Loading Application...'
    });
  })
  .catch(console.error);
});

server.get('/words/:list', (req, res) => {
  // res.send(req.params);
  res.redirect('/?list=' + req.params.list)

  // res.render('index', {
  //   content: '...'
  // });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
