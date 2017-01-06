import React from 'react'
import ReactDOM from 'react-dom'
import * as Utils from './libs/utils'

import App from './components/app'
import Words from './components/words'

ReactDOM.render(
  <div>
    <App dataList= {Utils.getUrlParam('dataList') || 'data'} />
    <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />
  </div>,
  document.getElementById('root')
)
