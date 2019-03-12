import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { GooglePlacesStation } from '..//contract/geolocation';

export interface Props {
  station: GooglePlacesStation;
  onPress: () => void;
}

export interface State {

}

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
        title={station.name}
        description={station.vicinity}
        flat={true}
        pinColor="purple"
        coordinate={location}
      />
    );
  }
}

const styles = StyleSheet.create({});
