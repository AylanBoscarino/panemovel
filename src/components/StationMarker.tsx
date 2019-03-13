import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { GooglePlacesStation } from '..//contract/geolocation';

export interface Props {
  station: GooglePlacesStation;
  onPress: () => void;
}

export interface State {}

export default class StationMarker extends Component<Props, State> {
  render() {
    const { station } = this.props;
    const location = {
      latitude: station.geometry.location.lat,
      longitude: station.geometry.location.lng,
    };
    return (
      <Marker
        onPress={this.props.onPress}
        flat={true}
        pinColor="purple"

        coordinate={location}>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({});
