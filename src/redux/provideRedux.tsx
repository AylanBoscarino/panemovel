import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

export default function (WrapedComponent: typeof React.Component) {
  return class extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <WrapedComponent />
        </Provider>
      );
    }
  };
}
