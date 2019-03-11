import React, { Component } from 'react';
import { Marker, LatLng } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export interface Props {
  coordinate: {
    latitude: number;
    longitude: number;
  }
}

export default class PositionMarker extends Component<Props, any> {
  render() {
    return (
      <Marker
        title="Você"
        description="você está aqui"
        flat={true}
        pinColor="blue"
        coordinate={this.props.coordinate}
      />
    );
  }
}

const styles = StyleSheet.create({});
