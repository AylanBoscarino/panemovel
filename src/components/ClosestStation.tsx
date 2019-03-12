import React, { Component, ReactComponentElement, ComponentElement } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ClosestStationContainer from './ClosestStationContainer';
import { GooglePlacesStation } from '../contract/geolocation';

export interface Props {
  station: GooglePlacesStation;
  onPress: () => void;
}

export interface State {}

export default class ClosestStation extends Component<Props, State> {
  public render() {
    const { station } = this.props;
    return (
      <ClosestStationContainer
        photoReference={station.photos && station.photos[0].photo_reference}
        >
        {(url: string): React.ReactNode => (
          <TouchableNativeFeedback onPress={this.props.onPress}>
            <View style={styles.container}>
              {url.length > 0 && <Image style={styles.image} source={{ uri: url }} /> }
              <View style={styles.textSpace}>
                <Text> {station && station.name} </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
      </ClosestStationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    top: '90%',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textSpace: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
