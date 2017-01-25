import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/components/app'
import config from './config'
import axios from 'axios'

// NOTE: Ref => https://www.lynda.com/Express-js-tutorials/Fetching-data-from-server-side/533304/557625-4.html

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

const getQuizzes = () => {}

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
              <App initialData={initialData} />
            ),
            initialData
        };
    })
    .catch(console.error);

export default serverRender;
