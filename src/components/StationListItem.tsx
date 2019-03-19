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
import { secondary, primary, text } from '../constants/colors';
import Avatar from './Avatar';

interface Props {
  station: GooglePlacesStation;
  selectStation: (station: GooglePlacesStation) => any;
}

interface State {
  url: string | null;
}

export default class StationListItem extends Component<Props, State> {
  state = {
    url: '',
  };
  componentDidMount() {
    const { station } = this.props;
    const photoReference = station.photos && station.photos[0].photo_reference;
    // const url = urlPlacePhotos(photoReference);
    const url = 'PLACEHOLDER';

    this.setState({
      url,
    });
  }

  _onPress = (event: any) => {
    this.props.selectStation(this.props.station);
    setTimeout(() => {
      Navigation.mergeOptions('BottomTabs', {
        bottomTabs: {
          currentTabId: 'map',
        },
      });
    }, 200);
  };

  render() {
    const { station } = this.props;
    const { url } = this.state;
    return (
      <TouchableNativeFeedback onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}><Avatar url={url} name={station.name}/></View>
          <View style={styles.textSpace}>
            <Text style={styles.stationName}>{station.name}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    // justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textSpace: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    borderBottomColor: text.content,
    borderBottomWidth: .3,
  }, 
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  stationName: {
    fontSize: 18,
    color: 'black'
  }
});
