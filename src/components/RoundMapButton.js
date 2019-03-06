import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class RoundMapButton extends Component {
  render() {
    return (
      <View style={{...styles.roundMapButton, ...this.props.style}} >
        <TouchableOpacity >
          <Image style={styles.buttonIcon} source={this.props.image} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  roundMapButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    position: 'absolute',
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
});
