import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

ReactDOM.render(
    <App quizzes={window.avaiableQuizzes} quizID={window.quizID} />,
  document.getElementById('root')
)
