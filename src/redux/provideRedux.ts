import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

export default function (Component) {
  return class extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component />
        </Provider>
      );
    }
  };
}
