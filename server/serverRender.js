const config = require('./config')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
// const App = require('../app/components/App');
// const config = require('./config');
const axios = require('axios');

// NOTE: Ref => https://www.lynda.com/Express-js-tutorials/Fetching-data-from-server-side/533304/557625-4.html

// const env = process.env;
// const config = {
//     mongodbUri: 'mongodb://localhost:27017/quiz_assistant',
//     port: env.PORT || 8080,
//     host: env.HOST || '0.0.0.0',
//     get serverUrl() {
//         return `http://${this.host}:${this.port}`;
//     }
// };

// NOTE: Set the URL for the API endpoint to use
const getApiUrl = (currentQuizID) => {
    // console.info('serverRender => getApiUrl(currentQuizID) => currentQuizID is ' + currentQuizID)

    if ( currentQuizID ) {
        // NOTE: Return a specific list of words
        return `${config.serverUrl}/api/quiz/${currentQuizID}`
    }

    // NOTE: Return a list of quizzes
    return `${config.serverUrl}/api/quizzes`
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

module.exports = function () {
   return {
     'render': serverRender,
     'getInitialData': getInitialQuizData,
     'getApiUrl': getApiUrl,
     'getQuizzes': getQuizzes
   };
};
