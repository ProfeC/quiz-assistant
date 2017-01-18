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

server.get('/', (req, res) => {
    // serverRender('20170109', '7', 'navigation', 'spelling')

    // NOTE: Get quiz list data
    let getQuizzes = () => {
        return axios.get(`${config.serverUrl}/api/files`)
    }

    // NOTE: Get initial quiz data
    let getQuizData = () => {
        return axios.get(`${config.serverUrl}/api/words/20170109`)
    }

    axios.get(`${config.serverUrl}/api/files`)
    .then(resp => {
        // console.info(resp[0].data) // Returns Navigation.
        // console.info(resp[1].data) // Returns Word list.

        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App quizzes={resp.data} />),
            avaiableQuizzes: resp.data
        });
    })
    .catch(console.error);
});

server.get('/words/:list', (req, res) => {
    // serverRender('20170109', '7', 'navigation', 'spelling')

    // NOTE: Get quiz list data
    let getQuizzes = () => {
        return axios.get(`${config.serverUrl}/api/files/navigation`)
    }

    // NOTE: Get initial quiz data
    let getQuizData = () => {
        if ( `${req.params.list}` ) {
            return axios.get(`${config.serverUrl}/api/words/${req.params.list}`)
        }

    }

    axios.all([getQuizData(), getQuizzes()])
    .then(resp => {
        console.info(resp[0].data) // Returns Navigation.
        console.info(resp[1].data) // Returns Word list.

        res.render('index', {
            initialMarkup: ReactDOMServer.renderToString(
            <App list={req.params.list} displayTime='13' navSource='navigation' navCategory='spelling' quizzes={resp[1].data} />),
            list: `${req.params.list}`,
            initialData: resp[0].data,
            avaiableQuizzes: resp[1].data,
            displayTime: 13
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
