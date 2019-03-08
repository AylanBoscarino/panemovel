import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapContainer from './MapContainer';
import PositionMarker from './PositionMarker';
import LocationButton from './LocationButton';
import StationMarker from './StationMarker';
import ClosestStation from './ClosestStation';


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
              {nearbyStations && nearbyStations.map((station, index) => (
                <StationMarker key={index} station={station} />
              ))}
            </MapView>
            <LocationButton style={styles.locationButton}/>
            {nearbyStations && <ClosestStation station={nearbyStations[0]} />}
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
    position: 'absolute',
    left: '85%',
    top: '20%',
  },
});
