import React, { Component } from 'react';
import { Text, View, ProgressBarAndroidProps } from 'react-native';
import { connect } from 'react-redux';

import { urlPlacePhotos } from '../constants';
import { GeolocationStateProps } from '../contract/geolocation';

export interface ClosestStationContainerProps {
  photoReference: string;
  children: (url: string, distance: number) => React.ReactNode;
}

export interface ClosestStationContainerState {
  url: string;
}

type Props = GeolocationStateProps &
  ClosestStationContainerProps &
  DispatchProps;

export class ClosestStationContainer extends Component<
  Props,
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
    prevState: ClosestStationContainerState
  ) {
    if (this.props !== prevProps) {
      const url = urlPlacePhotos(this.props.photoReference);

      this.setState({ url });
    }
  }

  public render() {
    const { children } = this.props;
    const { url } = this.state;
    const { distance } = this.props.geolocation.direction;
    return children(url, distance);
  }
}

const mapStateToProps = (state: any) => ({
  geolocation: state.geolocation,
});

const mapDispatchToProps: DispatchProps = {};

interface DispatchProps {}

export default connect<
  GeolocationStateProps,
  DispatchProps,
  ClosestStationContainerProps
>(
  mapStateToProps,
  mapDispatchToProps
)(ClosestStationContainer);
