import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'
import config from './config'
import axios from 'axios'

// NOTE: Ref => https://www.lynda.com/Express-js-tutorials/Fetching-data-from-server-side/533304/557625-4.html

// NOTE: Set the URL for the API endpoint to use
const getApiUrl = (quizID) => {
    // console.info('getApiUrl(quizID) => ' + quizID)

    if ( quizID ) {
        // NOTE: Return a specific list of words
        // console.info('`${config.serverUrl}/api/quiz/${quizID}` => ' + `${config.serverUrl}/api/quiz/${quizID}`)
        return `${config.serverUrl}/api/quiz/${quizID}`
    }

    // NOTE: Return a list of quizzes
    // console.info('`${config.serverUrl}/api/files` => ' + `${config.serverUrl}/api/files`)
    return `${config.serverUrl}/api/files`
}

const getQuizzes = () => {}

const getInitialQuizData = (quizID, apiData) => {}

const serverRender = (quizID, displayTime) => {
    // console.info('quizID => ' + quizID)
    // console.info('displayTime => ' + displayTime)
    let s = getApiUrl(quizID)
    console.info(s)

    axios.get(getApiUrl(quizID))
    .then(resp => {
        console.info('serverRender() => ' + resp.data)
        console.info('serverRender() => ' + {initialMarkup: ReactDOMServer.renderToString(<App quizID={quizID} displayTime={displayTime} />)})

        return {
            initialMarkup: ReactDOMServer.renderToString(
              <App quizID={quizID} displayTime={displayTime} />
            ),
            initialData: resp.data
        };
    })
    .catch(console.error);

    // TODO: 20170111 - Look up the most recent list show it is displayed first
    // axios.get(`${config.serverUrl}/api/files/navigation`)
    //   .then(resp => {
    //     return {
    //       initialMarkup: ReactDOMServer.renderToString(
    //         <App list='2010109' />
    //       ),
    //       initialNavigationData: resp.data
    //     };
    //   });
}

export default serverRender;
