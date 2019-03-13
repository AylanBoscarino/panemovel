import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MapView, { Callout } from 'react-native-maps';

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
  state = {
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
  }

  _onMapReady = () => {
    this.setState({
      map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        marginBottom: 1,
      },
    })
  }
  render() {
    return (
      <MapContainer>
        {(data: GeolocationState, functions: FunctionsObject) => (
          <View style={styles.container}>
            <MapView
              style={this.state.map}
              initialRegion={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                latitudeDelta: data.location.latitudeDelta,
                longitudeDelta: data.location.longitudeDelta,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              onMapReady={this._onMapReady}
              >
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
            {/* <LocationButton style={styles.locationButton} /> */}
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
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    left: '85%',
    top: '20%',
  },
});
