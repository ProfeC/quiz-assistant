import config from './config';
import apiRouter from './api';
import express from 'express';
import serverRender from './serverRender';
import axios from 'axios';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'
import Words from './app/components/words'

const server = express();

server.set('view engine', 'ejs');

// server.get('/test/:quizID', (req, res) => {
//     console.info(req.params)
//     console.info(res.data)
//
//     serverRender(req.params.quizID, 3)
//     .then( ({ initialMarkup, initialData }) => {
//         console.info(initialData)
//
//         res.render({
//             initialMarkup,
//             initialData
//         });
//
//     })
// })

server.get('/quiz/:quizID', (req, res) => {
    // NOTE: Get initial quiz data
    axios.get(`${config.serverUrl}/api/quiz/${req.params.quizID}`)
    .then(resp => {
        // console.info(resp.data) // Returns Word list.

        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App quizID={req.params.quizID} displayTime='13' quizzes={[]} />),
            quizID: `${req.params.quizID}`,
            initialData: resp.data,
            avaiableQuizzes: []
        });
    })
    .catch(console.error);
});

server.get('/', (req, res) => {
    axios.get(`${config.serverUrl}/api/quizzes`)
    .then(resp => {
        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App quizzes={resp.data.quizzes} />),
            avaiableQuizzes: resp.data.quizzes,
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
