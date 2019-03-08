import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import ClosestStationContainer from './ClosestStationContainer';

export default class ClosestStation extends Component {
  render() {
    const { station } = this.props;
    return (
      <ClosestStationContainer
        photoReference={station.photos[0].photo_reference}>
        {photo => (
          <TouchableNativeFeedback>
            <View style={styles.container}>
              {console.log({ photo })}
              <Image style={styles.image} source={{ uri: photo }} />
              <View style={styles.textSpace}>
                <Text> {station.name} </Text>
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
