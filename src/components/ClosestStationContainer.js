import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { urlPlacePhotos } from '../constants';

export default class ClosestStationContainer extends Component {
  state = {
    photo: null,
    url: null,
  };

  componentDidMount = async () => {
    const url = urlPlacePhotos(this.props.photoReference);

    this.setState({ url });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props !== prevProps) {
      const url = urlPlacePhotos(this.props.photoReference);

      this.setState({ url });
    }
  };

  render() {
    const { children } = this.props;
    const { url } = this.state;
    return children(url);
  }
}
