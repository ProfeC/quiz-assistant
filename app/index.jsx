require('react')

// var container = require(PATH.components + 'container')
  var container = document.createElement('div')
  container.id = 'root'
  container.innerHTML = 'Loading. Please wait...'

document.body.prepend(container)

require('./app/app')
