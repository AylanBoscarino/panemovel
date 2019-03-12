import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import RoundMapButton from './RoundMapButton';
import locationButtonIcon from '../../asstes/my_location.png';

export interface Props {
  style: object;
}

export interface State {

}

export default class LocationButton extends Component<Props, State> {
  render() {
    return (
      <RoundMapButton
        image={locationButtonIcon}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({

});
