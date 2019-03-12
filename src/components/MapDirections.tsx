import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { Region } from 'react-native-maps';

import { constants } from '../constants';

export interface Props {
  location: Region;
  direction: { lat: number, lng: number };
  isGivingDirection: boolean;
}

export interface State {}

export default class MapDirections extends Component<Props, State> {
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
