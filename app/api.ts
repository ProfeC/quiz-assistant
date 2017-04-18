// / <reference path="../node_modules/@types/node/index.d.ts" />

import axios from 'axios'


// NOTE: Get requested quiz data.
export const getQuiz = (quizID:string) => {
    return axios.get(`/api/quiz/${quizID}`)
        .then(resp => resp.data)
}

// NOTE: Get list of quizzes.
export const getQuizList = (category?:string) => {
    if (category !== undefined) {
        return axios.get(`/api/quizzes/${category}`)
            .then(resp => resp.data)

    } else {
        // axios.get('/api/quizzes')
        //     .then(resp => console.info('getQuizList() => ' + JSON.stringify(resp.data)))

        return axios.get('/api/quizzes')
            .then(resp => resp.data.quizzes)

    }
}

// NOTE: Get list of quizzes from the file system.
export const getQuizListFS:any = (category?:string) => {
    fetch('./app/data/quizzes.json')
    .then( function(res:any) {
      if (res.ok) {
        console.info('getQuizListFS Response.', res)
        return res
        // return true
      }

      throw new Error('Request for quiz list was unsuccessful')
    })
    .catch( function(error: any) {
      console.info('There was a problem with Fetch!', error)
    })
}
