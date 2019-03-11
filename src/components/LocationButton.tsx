import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import RoundMapButton from './RoundMapButton';
import locationButtonIcon from '../../asstes/my_location.png';

export default class LocationButton extends Component {
  render() {
    return (
      <RoundMapButton
        // styles={styles.locationButton}
        image={locationButtonIcon}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({

});
