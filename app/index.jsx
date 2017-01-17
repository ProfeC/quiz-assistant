import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './libs/utils'

import App from './components/app'
import Words from './components/words'
import PageHeader from './components/page-header'
import PageFooter from './components/page-footer'

ReactDOM.render(
    <PageHeader title='Quiz Assistant - Main Application' skill='' />,
  document.getElementById('header-main')
)

ReactDOM.render(
    <App urlList={Utils.getUrlParam('list') || '20170109'} displayTime={Utils.getUrlParam('displayTime')} navSource="navigation" navCategory="spelling" quizzes={window.avaiableQuizzes} />,
  document.getElementById('root')
)

// ReactDOM.render(
//     <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />,
//   document.getElementById('root')
// )
