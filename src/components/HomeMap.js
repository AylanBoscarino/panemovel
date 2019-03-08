import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections  from 'react-native-maps-directions';

import MapContainer from './MapContainer';
import PositionMarker from './PositionMarker';
import LocationButton from './LocationButton';
import StationMarker from './StationMarker';
import ClosestStation from './ClosestStation';


export default class HomeMap extends Component {
  render() {
    return (
      <MapContainer>
        {(coordinates, nearbyStations, spotlightStation, changeSpotlightStation) => (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                ...coordinates,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
              }}>
              <PositionMarker coordinate={coordinates} />
              {nearbyStations && nearbyStations.map((station, index) => (
                <StationMarker key={index} index={index} station={station} onPress={changeSpotlightStation}/>
              ))}
            </MapView>
            <LocationButton style={styles.locationButton}/>
            {nearbyStations && <ClosestStation station={nearbyStations[spotlightStation]} />}
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
