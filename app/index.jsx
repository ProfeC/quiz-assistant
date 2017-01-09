import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './libs/utils'

import App from './components/app'
import Nav from './components/navigation'
import Words from './components/words'

ReactDOM.render(
    <App urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} navSource="fileList" navCategory="spelling" />,
  document.getElementById('main')
)

// ReactDOM.render(
//     <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />,
//   document.getElementById('root')
// )

// ReactDOM.render(
//     <Nav source="fileList" category="spelling" className="side-nav" />,
//   document.getElementById('side-nav')
// )
