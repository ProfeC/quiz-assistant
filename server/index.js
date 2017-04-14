const config = require('./config')();
const express = require('express');
// const axios = require('axios');
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
// const App = require('../app/components/app)';
const apiRouter = require('./api')();
const serverRender = require('./serverRender')();

const server = express();

server.use(sassMiddleware({
    src: path.join(__dirname, 'app', 'scss'),
    dest: path.join(__dirname, 'dist')
}));

server.set('view engine', 'ejs');

server.use('/api', apiRouter);

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

server.get(['/quiz/:quizID'], (req, res) => {
    console.info('req.params.quizID is ' + req.params.quizID)

    serverRender.render(req.params.quizID)
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


server.use(express.static(path.resolve('dist')));

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});

// REF: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
