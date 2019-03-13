import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { Region, LatLng } from 'react-native-maps';

import { constants } from '../constants';
import DirectionsContainer from './DirectionsContainer';

export interface Props {}

export interface State {}

export default class MapDirections extends Component<Props, State> {
  render() {
    return (
      <DirectionsContainer>
        {(
          location: LatLng,
          destination: LatLng,
          isGivingDirection: boolean,
          distanceFromStation: (distance: number) => any
        ) =>
          isGivingDirection && (
            <MapViewDirections
              strokeWidth={3}
              strokeColor="blue"
              origin={location}
              language="pt-BR"
              destination={destination}
              apikey={constants.GOOGLE_MAPS_API_KEY}
              onReady={({ distance }: { distance: number }) =>
                distanceFromStation(distance)
              }
            />
          )
        }
      </DirectionsContainer>
    );
  }
}

const styles = StyleSheet.create({});
