import React from 'react'
import ReactDOM from 'react-dom'

import Words from './components/words'
ReactDOM.render(
  <Words urlList='20161127'/>,
    <Words urlList={Utils.getUrlParam('list') || '20161127'} displayTime={Utils.getUrlParam('displayTime')} />
  document.getElementById('root')
)
