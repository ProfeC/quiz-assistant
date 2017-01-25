import config from './config';
import apiRouter from './api';
import express from 'express';
import serverRender from './serverRender';
import axios from 'axios';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'

const server = express();

server.set('view engine', 'ejs');

// server.get('/quiz/:quizID', (req, res) => {
//     // NOTE: Get initial quiz data
//     axios.get(`${config.serverUrl}/api/quiz/${req.params.quizID}`)
//     .then(resp => {
//         // console.info(resp.data) // Returns Word list.
//
//         res.render('index', {
//             initialMarkup: ReactDOMServer.renderToString(
//             <App quizID={req.params.quizID} displayTime='13' initialData={[]} />),
//             quizID: `${req.params.quizID}`,
//             initialData: {data: resp.data, currentQuizID: `${req.params.quizID}`},
//             // initialData: resp.data,
//             avaiableQuizzes: []
//         });
//     })
//     .catch(console.error);
// });

server.get(['/', '/quiz/:quizID'], (req, res) => {
    console.info('req.params.quizID is ' + req.params.quizID)

    serverRender(req.params.quizID)
        .then(({initialMarkup, initialData}) => {
            // console.info('server => serverRender(req.params.quizID) => initialMarkup is ' + initialMarkup)
            // console.info('server => serverRender(req.params.quizID) => initialData is ' + initialData)

            res.render('index', {
                initialMarkup: initialMarkup,
                initialData: initialData
            });
        })
        .catch(console.error)
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
