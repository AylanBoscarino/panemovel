import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import { constants } from '../constants';

export default class MapDirections extends Component {
  render() {
    const { location, direction, isGivingDirection } = this.props;
    if (isGivingDirection) {
      return (
        <MapViewDirections
          strokeWidth={3}
          strokeColor="blue"
          origin={location}
          language="pt-BR"
          destination={{ latitude: direction.lat, longitude: direction.lng}}
          apikey={constants.GOOGLE_MAPS_API_KEY}
         />
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({});
