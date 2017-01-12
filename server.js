import config from './config';
import apiRouter from './api';
import express from 'express';
import serverRender from './serverRender';
import axios from 'axios';

const server = express();

server.set('view engine', 'ejs');


server.get('/', (req, res) => {
  // serverRender().then(({initialMarkup, initialNavigation}) => {
    res.render('index', {
  //     initialMarkup,
  //     initialNavigation
      content: 'Loading Application...',
      list: null
    });
  // })
  // .catch(console.error);
});

server.get('/words/:list', (req, res) => {
  // res.send(req.params);
  // res.redirect('/?list=' + req.params.list)

  console.log('list = ' + req.params.list);

  // serverRender()
  // .then(({initialMarkup, initialNavigation, list, content}) => {
  //   res.render('index', {
  //     initialMarkup,
  //     initialNavigation,
  //     list: req.params.list,
  //     content: 'Loading Application...'
  //   });
  // })
  // .catch(console.error);

  axios.get(`${config.serverUrl}/api/files/navigation/${req.params.list}`)
  .then( resp => {
    console.log(resp.data)

    res.render('index', {content: resp.data, list: req.params.list})
  })
  .catch(console.error)




});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
