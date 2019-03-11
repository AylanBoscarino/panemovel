import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';

import Loading from './Loading';
import fineLocation from '../permissions/fineLocation';
import { urlFindNearbyStations } from '../constants';
import {
  geolocationGrantPermission,
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationSelectStation,
  geolocationStorePosition,
  geolocationStoreWatchId,
} from '../redux/ducks/geolocation';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   grantedPermission: false,
    //   location: {
    //     latitude: -42.983068,
    //     longitude: -43.3614,
    //     latitudeDelta: 0.0122,
    //     longitudeDelta: 0.0051,
    //   },
    //   direction: {
    //     isGivingDirection: false,
    //     latitude: null,
    //     longitude: null,
    //   },
    //   nearbyStations: null,
    //   selectedStation: null,
    //   watchId: null,
    // };
  }

  // findNearbyStations = async () => {
  //   try {
  //     const url = urlFindNearbyStations(
  //       this.state.location.latitude,
  //       this.state.location.longitude
  //     );
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     this.setState({
  //       nearbyStations: data.results,
  //       selectedStation: data.results[0],
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // selectStation = station => {
  //   this.setState(currentState => ({
  //     selectedStation: station,
  //     direction: {
  //       ...currentState.direction,
  //       latitude: station.geometry.location.lat,
  //       longitude: station.geometry.location.lng,
  //     },
  //   }));
  // };

  selectStation = station => {
    this.props.geolocationSelectStation(station);
  }
  async componentDidMount() {
    await this.props.geolocationGrantPermission();
    if (this.props.geolocation.grantedPermission) {
      this.props.geolocationStorePosition(() => {
        this.props.geolocationFindNearbyStations(
          this.props.geolocation.location.latitude,
          this.props.geolocation.location.longitude,
        );
      });
    }
  }

  // componentDidMount() {
  //   fineLocation().then(grantedPermission => {
  //     this.setState({
  //       grantedPermission,
  //     });

  //     if (grantedPermission) {
  //       const watchId = Geolocation.watchPosition(
  //         position => {
  //           this.setState(currentState => ({
  //             location: {
  //               ...currentState.location,
  //               latitude: position.coords.latitude,
  //               longitude: position.coords.longitude,
  //             },
  //           }));
  //           this.findNearbyStations();
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           showLocationDialog: true,
  //           fastestInterval: 999,
  //           interval: 1000,
  //           distanceFilter: 0,
  //         }
  //       );
  //       this.setState({ watchId });
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   Geolocation.clearWatch(this.state.watchId);
  //   Geolocation.stopObserving();
  // }

  componentWillUnmount() {
    this.props.geolocationClearWatch();
  }
  // createDirection = () => {
  //   this.setState(currentState => ({
  //     direction: {
  //       ...currentState.direction,
  //       isGivingDirection: true,
  //     },
  //   }));
  // };
  createDirection = () => {
    this.props.geolocationCreateDirection();
  }

  render() {
    const { children } = this.props;
    const { grantedPermission } = this.props.geolocation;
    const { selectStation, createDirection } = this;
    if (grantedPermission === true) {
      return children(this.props.geolocation, { selectStation, createDirection });
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

const mapStateToProps = state => ({
  geolocation: state.geolocation,
});

const mapDispatchToProps = {
  geolocationGrantPermission,
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationSelectStation,
  geolocationStorePosition,
  geolocationStoreWatchId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
