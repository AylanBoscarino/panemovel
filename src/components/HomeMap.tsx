import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapContainer from './MapContainer';
import LocationButton from './LocationButton';
import StationMarker from './StationMarker';
import ClosestStation from './ClosestStation';
import MapDirections from './MapDirections';
import { GeolocationState } from '../redux/ducks/geolocation';
import { GooglePlacesStation } from '../contract/geolocation';

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
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}>
              {data.nearbyStations &&
                data.nearbyStations.map(
                  (station: GooglePlacesStation, index) => (
                    <StationMarker
                      key={index}
                      station={station}
                      onPress={() => functions.selectStation(station)}
                    />
                  )
                )}
              <MapDirections />
            </MapView>
            <LocationButton style={styles.locationButton} />
            {data.nearbyStations && (
              <ClosestStation
                station={data.selectedStation}
                onPress={functions.createDirection}
              />
            )}
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
