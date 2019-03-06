import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export default class PositionMarker extends Component {
  render() {
    return (
      <Marker
        title="Você"
        description="você está aqui"
        flat={true}
        pinColor="blue"
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({});
