import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StationList from '../components/StationList';

export default class ListStations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StationList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
