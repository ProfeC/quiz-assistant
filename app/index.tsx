import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

let initialData = {}

ReactDOM.render(
    <App initialData={initialData} displayName="Main Application" />,
  document.getElementById('root')
);
