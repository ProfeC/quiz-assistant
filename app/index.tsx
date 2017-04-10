import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(
    <App initialData={window.initialData} />,
  document.getElementById('root')
)
