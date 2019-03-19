import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

import HomeMap from '../components/HomeMap';
import { primary } from '../constants/colors';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeMap />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
