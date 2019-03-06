import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

export default class RoundMapButton extends Component {
  render() {
    return (
      <Button
      style={styles.roundMapButton}
      {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  roundMapButton: {
    borderRadius: 0.5,
    backgroundColor: '#fff',
    color: 'black',
  },
});
