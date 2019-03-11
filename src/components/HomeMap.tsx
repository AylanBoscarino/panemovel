import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapContainer from './MapContainer';
import PositionMarker from './PositionMarker';
import LocationButton from './LocationButton';
import StationMarker from './StationMarker';
import ClosestStation from './ClosestStation';
import MapDirections from './MapDirections';
import { GeolocationState } from '../redux/ducks/geolocation';

export interface FunctionsObject {
  selectStation: (station: object) => void;
  createDirection: () => void;
}

export default class HomeMap extends Component {
  render() {
    return (
      <MapContainer>
        {(data: GeolocationState, functions: FunctionsObject) => (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                latitudeDelta: data.location.latitudeDelta,
                longitudeDelta: data.location.longitudeDelta,
              }}>
              <PositionMarker coordinate={data.location} />
              {data.nearbyStations &&
                data.nearbyStations.map((station, index) => (
                  <StationMarker
                    key={index}
                    station={station}
                    onPress={() => functions.selectStation(station)}
                  />
                ))}
              <MapDirections
                location={data.location}
                direction={
                  data.selectedStation && data.selectedStation.geometry.location
                }
                isGivingDirection={data.direction.isGivingDirection}
              />
            </MapView>
            <LocationButton style={styles.locationButton} />
            {data.nearbyStations && (
              <ClosestStation
                station={data.selectedStation}
                onPress={functions.createDirection}
              />
            )}
            {console.log(data.direction.isGivingDirection)}
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
