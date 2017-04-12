/// <reference path="app.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App initialData={QuizAssistant.initialData} displayName="Main Application" />,
  document.getElementById('root')
);
