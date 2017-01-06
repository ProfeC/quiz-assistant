import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './app/components/Words';

import config from './config';
import axios from 'axios';

// FIXME: Causes application crash because the server doesn't have access to the URL parameters the same way the client does.
// FIXME: Ref => https://www.lynda.com/Express-js-tutorials/Fetching-data-from-server-side/533304/557625-4.html

const serverRender = () =>
  axios.get(`${config.serverUrl}/api/contests`)
    .then(resp => {
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App list='20161127' />
        ),
        initialData: resp.data
      };
    });

export default serverRender;
