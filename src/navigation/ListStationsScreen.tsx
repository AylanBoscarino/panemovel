import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StationList from '../components/StationList';
import { Navigation, Options } from 'react-native-navigation';
import { primary } from '../constants/colors';

export default class ListStations extends Component {
  constructor(props: any) {
    super(props)
    Navigation.events().bindComponent(this, 'list');
  }
  
  static options(props: any): Options {
    return {
      topBar: {
        title: {
          text: 'Postos mais perto',
          color: '#fff',
          fontFamily: 'roboto',
          fontSize: 24,
        },
        background: {
          color: primary.main,
        }
      },
    };
  }
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
