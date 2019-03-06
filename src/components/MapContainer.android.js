import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Loading from './Loading';
import fineLocation from '../permissions/fineLocation';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grantedPermission: false,
      locationMock: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    fineLocation().then(grantedPermission => {
      this.setState({
        grantedPermission,
      });

      if (grantedPermission) {
        Geolocation.getCurrentPosition(position => {
          this.setState({
            locationMock: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { grantedPermission, locationMock } = this.state;

    if (grantedPermission === true) {
      return children(locationMock);
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
