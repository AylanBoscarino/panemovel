import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

export default function (WrapedComponent: any) {
  class HoC extends React.Component {
    static options(props: any) {}
    render() {
      return (
        <Provider store={store}>
          <WrapedComponent />
        </Provider>
      );
    }
  };
  HoC.options = WrapedComponent.options;
  return HoC;
}
