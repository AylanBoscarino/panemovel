import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  geolocationClearWatch,
  geolocationCreateDirection,
  geolocationFindNearbyStations,
  geolocationGrantPermission,
  geolocationSelectStation,
  GeolocationState,
  geolocationStorePosition,
  geolocationStoreWatchId,
  Dispatch,
} from '../redux/ducks/geolocation';
import Loading from './Loading';

export interface OwnProps {
  children: (geolocation: GeolocationState, options: any) => React.ReactNode;
}

export interface State {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props, State> {
  public selectStation = (station: object) => {
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

function mapStateToProps(state: any): StateProps {
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
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

export interface StateProps {
  geolocation: GeolocationState;
}

export interface DispatchProps {
  geolocationGrantPermission: (param?: any) => any;
  geolocationClearWatch: (param?: any) => any;
  geolocationCreateDirection: (param?: any) => any;
  geolocationFindNearbyStations: (param1: any, param2: any) => any;
  geolocationSelectStation: (param?: any) => any;
  geolocationStorePosition: (param?: any) => any;
  geolocationStoreWatchId: (param?: any) => any;
}
