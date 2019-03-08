import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';

export default class StationMarker extends Component {
  render() {
    const { station } = this.props;
    const location = {
      latitude: station.geometry.location.lat,
      longitude: station.geometry.location.lng,
    };
    console.log({station});
    return (
      <Marker
        title={station.name}
        description={station.vicinity}
        flat={true}
        pinColor="purple"
        coordinate={location}
        onPress={() => this.props.onPress(this.props.index)}
      />
    );
  }
}

const styles = StyleSheet.create({});
