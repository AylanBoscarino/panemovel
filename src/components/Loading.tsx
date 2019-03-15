import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { primary, text } from '../constants/colors';

const loadingImage = require('../../asstes/Magnify-1s-200px.gif');

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
        <ActivityIndicator size="large" color={primary.main}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',

  },
  image: {
    width: '100%',
    height:  '100%',
  },
  imageContainer: {
    flex: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
  attribution: {
    flex: .5,
    color: text.attibution,
  },
});
