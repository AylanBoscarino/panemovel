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
        latitude: -42.983068,
        longitude: -43.3614,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      nearbyStations: null,
      watchId: null,
      spotlightStation: 0,
    };
  }

  findNearbyStations = async () => {
    try {
      const url = urlFindNearbyStations(
        this.state.location.latitude,
        this.state.location.longitude
      );
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ nearbyStations: data.results });
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
        const watchId = Geolocation.watchPosition(position => {
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          this.findNearbyStations();
        }, {
          enableHighAccuracy: true,
          showLocationDialog: true,
          fastestInterval: 1000,
          interval: 3000,
          distanceFilter: 1,
        });
        this.setState({ watchId });
      }
    });
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.state.watchId);
    Geolocation.stopObserving();
  }

  changeSpotlightStation = (index) => {
    this.setState({
      spotlightStation: index,
    });
  };

  render() {
    const { children } = this.props;
    const { grantedPermission, location, nearbyStations, spotlightStation } = this.state;
    if (grantedPermission === true) {
      return children(location, nearbyStations, spotlightStation, this.changeSpotlightStation);
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
