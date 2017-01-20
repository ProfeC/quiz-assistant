import config from './config';
import apiRouter from './api';
import express from 'express';
// import serverRender from './serverRender';
import axios from 'axios';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'
import Words from './app/components/words'

const server = express();

server.set('view engine', 'ejs');

server.get('/quiz/:list', (req, res) => {
    // NOTE: Get initial quiz data
    axios.get(`${config.serverUrl}/api/quiz/${req.params.list}`)
    .then(resp => {
        // console.info(resp.data) // Returns Word list.

        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App quizID={req.params.list} displayTime='13' quizzes={[]} />),
            quizID: `${req.params.list}`,
            initialData: resp.data,
            avaiableQuizzes: []
        });
    })
    .catch(console.error);
});

server.get('/', (req, res) => {
    axios.get(`${config.serverUrl}/api/files`)
    .then(resp => {
        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App quizzes={resp.data} />),
            avaiableQuizzes: resp.data,
            quizID: 0
        });
    })
    .catch(console.error);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
