import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';

export default class StationMarker extends Component {
  render() {
    console.log(this.props.coordinate)
    return (
      <Marker
        title="Você"
        description="você está aqui"
        flat={true}
        pinColor="purple"
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({});
