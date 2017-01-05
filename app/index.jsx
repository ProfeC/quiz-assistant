// var container = require(PATH.components + 'container')
  var container = document.createElement('div')
  container.id = 'root'
  container.innerHTML = 'Loading. Please wait...'

document.body.prepend(container)

import React from 'react'
import ReactDOM from 'react-dom'

import Words from './components/words'
ReactDOM.render(
  <Words />,
  document.getElementById('root')
)
