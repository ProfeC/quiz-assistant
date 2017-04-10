import axios from 'axios'

// NOTE: Get requested quiz data.
export const getQuiz = quizID => {
    return axios.get(`/api/quiz/${quizID}`)
        .then(resp => resp.data)
}

// NOTE: Get list of quizzes.
export const getQuizList = (category) => {
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
