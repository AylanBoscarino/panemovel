import React, { Component, Children } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { LatLng } from 'react-native-maps';

import {
  geolocationAlterMapZoom,
  geolocationAlterMapPosition,
  geolocationDistanceFromStation,
} from '../redux/ducks/geolocation';
import { GeolocationState } from '../redux/ducks/geolocation';
import { StoreState, GeolocationStateProps } from '../contract/geolocation';
import { getCenterPosition } from '../service/geolocation';

export interface OwnProps {
  children: (
    location: LatLng,
    destination: LatLng,
    isGivingDirection: boolean,
    geolocationDistanceFromStation: (distance: number) => any,
  ) => React.ReactNode;
}

export interface State {}

export interface DispatchProps {
  geolocationAlterMapZoom: (start: LatLng, end: LatLng) => any;
  geolocationAlterMapPosition: (coordinates: LatLng) => any;
  geolocationDistanceFromStation: (discante: number) => any;
}

type Props = GeolocationStateProps & DispatchProps & OwnProps;

class DirectionsContainer extends Component<Props, State> {


  render() {
    const { children, geolocationDistanceFromStation } = this.props;
    const { location, direction } = this.props.geolocation;
    return children(location, direction, direction.isGivingDirection, geolocationDistanceFromStation);
  }
}

const mapStateToProps = (state: StoreState): GeolocationStateProps => ({
  geolocation: state.geolocation,
});

const mapDispatchToProps: DispatchProps = {
  geolocationAlterMapZoom,
  geolocationAlterMapPosition,
  geolocationDistanceFromStation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectionsContainer);
