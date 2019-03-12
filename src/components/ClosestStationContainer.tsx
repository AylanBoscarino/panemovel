import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { urlPlacePhotos } from '../constants';

export interface ClosestStationContainerProps {
  photoReference: string;
  children: (url: string) => React.ReactNode;
}

export interface ClosestStationContainerState {
  url: string;
}

export default class ClosestStationContainer extends Component<
  ClosestStationContainerProps,
  ClosestStationContainerState
> {
  public state = {
    url: '',
  };

  public componentDidMount() {
    const url = urlPlacePhotos(this.props.photoReference);

    this.setState({ url });
  }

  public componentDidUpdate(
    prevProps: ClosestStationContainerProps,
    prevState: ClosestStationContainerState,
  ) {
    if (this.props !== prevProps) {
      const url = urlPlacePhotos(this.props.photoReference);

      this.setState({ url });
    }
  }

  public render() {
    const { children } = this.props;
    const { url } = this.state;
    return children(url);
  }
}
