import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <MantineProvider>
    <ModalsProvider>
      <NotificationsProvider position='top-right'>
        <React.StrictMode>
          <Router>
            <App />
          </Router>
        </React.StrictMode>
      </NotificationsProvider>
    </ModalsProvider>
  </MantineProvider>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
