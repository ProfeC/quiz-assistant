const axios = require('axios');
// const config = require('./config')();
const express = require('express');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sassMiddleware = require('node-sass-middleware');

const App = require(path.resolve('app', 'components', 'App.tsx'));
const apiRouter = require('./api')();
// const serverRender = require('./serverRender')();

// NOTES: Defaults
const env = process.env;
const nodeEnv = env.NODE_ENV || 'development';
const dbUri = 'mongodb://localhost:27017/quiz_assistant'; //Mongo DB
const port = env.PORT || 3000;
const host = env.HOST || '0.0.0.0';

// NOTE: Get server URL
const serverUrl = 'http://' + host + ':' + port;

const server = express();

// NOTE: simple logger for this server's requests all requests to this server will first hit this middleware
server.use(function(req, res, next) {
  console.info('%s %s %s', req.method, req.url, req.path);
  next();
});

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

server.get(['/', '/quiz/:quizID'], (req, res) => {
    console.info('req.params.quizID is ' + req.params.quizID)
    let quizID = '';

    // server.get(serverRender(req.params.quizID), (req, resp) => {
    //   console.info('Server Get Render => ', req)
    // } )

    if ( req.params.quizID !== 'undefined' ) {
      let quizID = req.params.quizID;
    }

    server.get(serverRender(req.params.quizID), (req, resp) => {
      console.info('Server Get Render => ', req)
    } )

    let data = serverRender(quizID);
    console.info('L71 - Data', data);

    ({initialMarkup, initialData}) => {
        // console.info('server => serverRender(req.params.quizID) => initialMarkup is ' + initialMarkup)
        // console.info('server => serverRender(req.params.quizID) => initialData is ' + initialData)

        res.render('index', {
            initialMarkup: initialMarkup,
            initialData: initialData
        });
    }
});


server.use(express.static(path.resolve('dist')));

server.listen(port, host, () => {
    console.info('Express listening on port', port);
});

// NOTE: Set the URL for the API endpoint to use
const getApiUrl = (currentQuizID) => {
    // console.info('serverRender => getApiUrl(currentQuizID) => currentQuizID is ' + currentQuizID)

    if ( currentQuizID ) {
        // NOTE: Return a specific list of words
        return serverUrl + '/api/quiz/' + currentQuizID
    }

    // NOTE: Return a list of quizzes
    return serverUrl + '/api/quizzes'
}

const getQuizzes = () => {
  return false;
}

const getInitialQuizData = (currentQuizID, apiData) => {
    // console.info('serverRender => getInitialQuizData(currentQuizID, apiData) => currentQuizID is ' + currentQuizID + ', apiData is ' + apiData)

    if ( currentQuizID ) {
        return {
            currentQuizID: apiData.id,
            quizzes: {
                [apiData.id]: apiData
            }
        }
    }
    return {
        quizzes: apiData.quizzes
    }
}


const serverRender = (currentQuizID) =>
    axios.get(getApiUrl(currentQuizID))
    .then(resp => {
        // console.info('serverRender => axios.get => ' + resp.data)
        // console.info({initialMarkup: ReactDOMServer.renderToString(<App currentQuizID={currentcurrentQuizID} />)})

        const initialData = getInitialQuizData(currentQuizID, resp.data)
        // console.info('serverRender => initialData is ' + initialData)

        return {
            initialMarkup: ReactDOMServer.renderToString(
              '<App initialData={initialData} />'
            ),
            initialData
        };
    })
    .catch(console.error);


// REFS: https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.3-end/server.js
