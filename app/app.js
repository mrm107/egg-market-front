/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'babel-polyfill';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!../semantic/src/site/assets/image/favicon/eggmarket.png'; // eslint-disable-line import/extensions
import '!file-loader?name=[name].[ext]!../semantic/src/site/assets/image/splash-spinner.gif'; // eslint-disable-line import/extensions
import '!file-loader?name=[name].[ext]!./manifest.json'; // eslint-disable-line import/extensions
import 'file-loader?name=[name]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import '../semantic/src/site/assets/font/IRANsans5/css/fontiran.css';
import '../semantic/dist/semantic.min.css';

// Import root app
import App from './containers/App';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';


import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// analyser
import ReactGA from 'react-ga';
ReactGA.initialize('UA-131266104-2');

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

// const AUTH_TOKEN = localStorage.getItem('token');
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
