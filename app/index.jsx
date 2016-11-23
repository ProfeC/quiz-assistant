// var container = require(PATH.components + 'container')
  var container = document.createElement('div')
  container.id = 'root'
  container.innerHTML = 'Loading. Please wait...'

document.body.prepend(container)

import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'
import Provider from './components/Provider'

ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById('root')
)
