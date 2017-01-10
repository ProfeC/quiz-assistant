import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './libs/utils'

import App from './components/app'
import Navigation from './components/navigation'
import Words from './components/words'
import PageHeader from './views/page-header'
import PageFooter from './views/page-footer'

ReactDOM.render(
    <PageHeader title='Spelling Quiz Assistant - Main Application' skill='' />,
  document.getElementById('header-main')
)

ReactDOM.render(
    <Navigation source="fileList" category="spelling" className="side-nav" title="Spelling Words" />,
  document.getElementById('side-nav')
)

ReactDOM.render(
    <App urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} navSource="fileList" navCategory="spelling" />,
  document.getElementById('root')
)

// ReactDOM.render(
//     <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />,
//   document.getElementById('root')
// )
