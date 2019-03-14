import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import {
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationGrantPermission,
  geolocationSelectStation,
  GeolocationState,
  geolocationStorePosition,
  geolocationStoreWatchId,
  geolocationAlterMapPosition,
} from '../redux/ducks/geolocation';
import Loading from './Loading';
import {
  StoreState,
  GooglePlacesStation,
  GeolocationStateProps,
} from '../contract/geolocation';
import { LatLng } from 'react-native-maps';
import { getCenterPosition } from '../service/geolocation';

export interface OwnProps {
  children: (geolocation: GeolocationState, options: any) => React.ReactNode;
}

export interface State {}

type Props = GeolocationStateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props, State> {
  centralize = (location: LatLng, direction: LatLng) => {
    const centerPosition = getCenterPosition(location, direction);
    this.props.geolocationAlterMapPosition(centerPosition);
  };

  public selectStation = (station: GooglePlacesStation) => {
    this.props.geolocationSelectStation(station);
  };

  public async componentDidMount() {
    await this.props.geolocationGrantPermission();
    if (this.props.geolocation.grantedPermission) {
      this.props.geolocationStorePosition(() => {
        this.props.geolocationFindNearbyStations(
          this.props.geolocation.location.latitude,
          this.props.geolocation.location.longitude
        );
      });
    }
  }

  public componentWillUnmount() {
    this.props.geolocationClearWatch(this.props.geolocation.watchId);
  }

  public createDirection = () => {
    this.props.geolocationCreateDirection();
  };

  public render() {
    const { children } = this.props;
    const { grantedPermission } = this.props.geolocation;
    const { selectStation, createDirection } = this;

    if (grantedPermission === true && this.props.geolocation.nearbyStations) {
      return children(this.props.geolocation, {
        selectStation,
        createDirection,
      });
    }

    if (grantedPermission === false) {
      return (
        <View>
          <Text>SEM PERMISSÃO</Text>
        </View>
      );
    }

    return <Loading />;
  }
}

function mapStateToProps(state: any): GeolocationStateProps {
  return {
    geolocation: state.geolocation,
  };
}

const mapDispatchToProps: DispatchProps = {
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationGrantPermission,
  geolocationSelectStation,
  geolocationStorePosition,
  geolocationStoreWatchId,
  geolocationAlterMapPosition,
};

export default connect<GeolocationStateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

export interface DispatchProps {
  geolocationGrantPermission: () => any;
  geolocationClearWatch: (watchId: string) => any;
  geolocationCreateDirection: () => any;
  geolocationFindNearbyStations: (latitude: number, longitude: number) => any;
  geolocationSelectStation: (station: GooglePlacesStation) => any;
  geolocationStorePosition: (findStation: () => void) => any;
  geolocationStoreWatchId: (watchId: string) => any;
  geolocationAlterMapPosition: (coordinates: LatLng) => any;
}
