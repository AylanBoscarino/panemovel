import React, { Component, Children } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { LatLng } from 'react-native-maps';

import {
  geolocationAlterMapZoom,
  geolocationAlterMapPosition,
} from '../redux/ducks/geolocation';
import { GeolocationState } from '../redux/ducks/geolocation';
import { StoreState, GeolocationStateProps } from '../contract/geolocation';
import { getCenterPosition } from '../service/geolocation';

export interface OwnProps {
  children: (
    location: LatLng,
    destination: LatLng,
    isGivingDirection: boolean
  ) => React.ReactNode;
}

export interface State {}

export interface DispatchProps {
  geolocationAlterMapZoom: (start: LatLng, end: LatLng) => any;
  geolocationAlterMapPosition: (coordinates: LatLng) => any;
}

type Props = GeolocationStateProps & DispatchProps & OwnProps;

class DirectionsContainer extends Component<Props, State> {


  render() {
    const { children } = this.props;
    const { location, direction } = this.props.geolocation;

    return children(location, direction, direction.isGivingDirection);
  }
}

const mapStateToProps = (state: StoreState): GeolocationStateProps => ({
  geolocation: state.geolocation,
});

const mapDispatchToProps: DispatchProps = {
  geolocationAlterMapZoom,
  geolocationAlterMapPosition,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectionsContainer);
