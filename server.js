import config from './config';
import apiRouter from './api';
import express from 'express';
// import serverRender from './serverRender';
import axios from 'axios';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'

const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    // serverRender('20170109', '7', 'navigation', 'spelling')

    // NOTE: Get quiz list data
    let getQuizCardData = () => {
        return axios.get(`${config.serverUrl}/api/files/navigation`)
    }

    // NOTE: Get initial quiz data
    let getQuizData = () => {
        return axios.get(`${config.serverUrl}/api/words/20170109`)
    }

    axios.all([getQuizData(), getQuizCardData()])
    .then(resp => {
        // console.info(resp[0].data) // Returns Navigation.
        // console.info(resp[1].data) // Returns Word list.

        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App list='20170109' displayTime='13' navSource='navigation' navCategory='spelling' />),
            list: 20170109,
            initialData: resp[0].data,
            initialCardData: resp[1].data
        });
    })
    .catch(console.error);
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
