import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { GooglePlacesStation } from '../contract/geolocation';
import { urlPlacePhotos } from '../constants';
import { Navigation } from 'react-native-navigation';

interface Props {
  station: GooglePlacesStation;
}

interface State {
  url: string | null;
}

export default class StationListItem extends Component<Props, State> {
  state = {
    url : null
  }
  componentDidMount() {
    const { station } = this.props;
    const photoReference = station.photos && station.photos[0].photo_reference;
    const url = urlPlacePhotos(photoReference);

    this.setState({
      url,
    });
  }

  render() {
    const { station } = this.props;
    const { url } = this.state;
    return (
      <TouchableNativeFeedback
        onPress={() => {
          setTimeout(() => {
            Navigation.mergeOptions('BottomTabs', {
              bottomTabs: {
                currentTabId: 'map',
              }
            })
          },.1);
        }}
      >
        <View style={styles.container}>
          {url && <Image style={styles.image} source={{ uri: url }} />}
          <View style={styles.textSpace}>
            <Text> {station.name}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
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
