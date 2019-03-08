import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapContainer from './MapContainer';
import PositionMarker from './PositionMarker';
import RoundMapButton from './RoundMapButton';
import StationMarker from './StationMarker';

import locationButtonIcon from '../../asstes/my_location.png';

export default class HomeMap extends Component {
  render() {
    return (
      <MapContainer>
        {({ latitude, longitude }, nearbyStations) => (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <PositionMarker coordinate={{ latitude, longitude }} />
              {nearbyStations.map((stationCoordinates, index) => (
                <StationMarker key={index} coordinate={stationCoordinates} />
              ))}
            </MapView>
            <RoundMapButton
              style={styles.locationButton}
              image={locationButtonIcon}
            />
          </View>
        )}
      </MapContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationButton: {
    left: '80%',
    top: '80%',
  },
});
