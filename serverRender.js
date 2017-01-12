import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './app/components/app';

import config from './config';
import axios from 'axios';

// FIXME: Causes application crash because the server doesn't have access to the URL parameters the same way the client does.
// FIXME: Ref => https://www.lynda.com/Express-js-tutorials/Fetching-data-from-server-side/533304/557625-4.html

const serverRender = (list) => {
  axios.get(`${config.serverUrl}/api/files/navigation`)
    .then(resp => {
      console.info(resp.data)
      // console.info({initialMarkup: ReactDOMServer.renderToString(<App list={list} />), initialNavigation: resp.data})

      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App list={list} />
        ),
        initialNavigation: resp.data
      };
    });

  // TODO: 20170111 - Look up the most recent list show it is displayed first
  // axios.get(`${config.serverUrl}/api/files/navigation`)
  //   .then(resp => {
  //     return {
  //       initialMarkup: ReactDOMServer.renderToString(
  //         <App list='2010109' />
  //       ),
  //       initialNavigationData: resp.data
  //     };
  //   });
}

export default serverRender;
