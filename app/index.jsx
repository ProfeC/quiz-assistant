import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './libs/utils'

import App from './components/app'
import Words from './components/words'
import PageHeader from './views/page-header'
import PageFooter from './views/page-footer'

ReactDOM.render(
    <PageHeader title='Quiz Assistant - Main Application' skill='' />,
  document.getElementById('header-main')
)

ReactDOM.render(
    <App urlList={Utils.getUrlParam('list') || '20170109'} displayTime={Utils.getUrlParam('displayTime')} navSource="navigation" navCategory="spelling" cards={window.initialCardData} />,
  document.getElementById('root')
)

// ReactDOM.render(
//     <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />,
//   document.getElementById('root')
// )
