import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Loading from './Loading';
import fineLocation from '../permissions/fineLocation';
import { urlFindNearbyStations } from '../constants';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grantedPermission: false,
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      nearbyStations: [
        {
          latitude: 0,
          longitude: 0,
        },
      ],
    };
  }

  findNearbyStations = async () => {
    try {
      const url = urlFindNearbyStations(
        this.state.location.latitude,
        this.state.location.longitude
      );
      const response = await fetch(url);
      const retrievedStations = await response.json();
      const nearbyStations = retrievedStations.results.map(station => ({
        latitude: station.geometry.location.lat,
        longitude: station.geometry.location.lng,
      }));
      this.setState({ nearbyStations });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    fineLocation().then(grantedPermission => {
      this.setState({
        grantedPermission,
      });

      if (grantedPermission) {
        Geolocation.getCurrentPosition(position => {
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          this.findNearbyStations();
        });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { grantedPermission, location, nearbyStations } = this.state;

    if (grantedPermission === true) {
      return children(location, nearbyStations);
    }

    if (grantedPermission === false) {
      return (
        <View>
          <Text>SEM PERMISSÃO</Text>
        </View>
      );
    }

    if (grantedPermission === undefined) {
      return <Loading />;
    }
  }
}
