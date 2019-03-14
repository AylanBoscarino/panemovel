import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  GeolocationStateProps,
  GooglePlacesStation,
} from '../contract/geolocation';

import {
  geolocationClearWatch,
  geolocationSelectStation,
} from '../redux/ducks/geolocation';

export interface State {}

export interface OwnProps {
  children: (
    nearbyStations: GooglePlacesStation[],
    geolocationSelectStation: (station: GooglePlacesStation) => any
  ) => React.ReactNode;
}

type Props = GeolocationStateProps & DispatchProps & OwnProps;

class StationListContainer extends Component<Props, State> {
  render() {
    const { nearbyStations } = this.props.geolocation;
    return (
      nearbyStations &&
      this.props.children(nearbyStations, this.props.geolocationSelectStation)
    );
  }
}

function mapStateToProps(state: any): GeolocationStateProps {
  return {
    geolocation: state.geolocation,
  };
}

const mapDispatchToProps: DispatchProps = {
  geolocationClearWatch,
  geolocationSelectStation,
};

export default connect<GeolocationStateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(StationListContainer);

export interface DispatchProps {
  geolocationClearWatch: (v?: any) => any;
  geolocationSelectStation: (station: GooglePlacesStation) => any;
}
