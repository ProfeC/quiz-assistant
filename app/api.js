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
        return axios.get('/api/quizzes')
            .then(resp => resp.data)

    }
}
