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
} from '../redux/ducks/geolocation';
import Loading from './Loading';

export interface Props {
  children: (geolocation: GeolocationState, options: object) => React.ReactNode;
  geolocationGrantPermission: () => void;
  geolocationClearWatch: () => void;
  geolocationCreateDirection: () => void;
  geolocationFindNearbyStations: (
    lat: number | null,
    lng: number | null,
  ) => void;
  geolocationSelectStation: (station: object) => void;
  geolocationStorePosition: (
    param: (callback: (lat: number | null, lng: number | null) => void) => void
  ) => void;
  geolocationStoreWatchId: () => void;
  geolocation: GeolocationState;
}

export interface State {}

class MapContainer extends Component<Props, State> {
  public selectStation = (station: object) => {
    this.props.geolocationSelectStation(station);
  }

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
    this.props.geolocationClearWatch();
  }

  public createDirection = () => {
    this.props.geolocationCreateDirection();
  }

  public render() {
    const { children } = this.props;
    const { grantedPermission } = this.props.geolocation;
    const { selectStation, createDirection } = this;

    if (grantedPermission === true) {
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

    if (grantedPermission === undefined) {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state: any): StateProps => ({
  geolocation: state.geolocation,
});

const mapDispatchToProps = {
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationGrantPermission,
  geolocationSelectStation,
  geolocationStorePosition,
  geolocationStoreWatchId,
};

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainer);

export interface StateProps {
  geolocation: Geolocation
}

export interface DispatchProps {

}