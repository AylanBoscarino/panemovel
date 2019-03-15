import React, {
  Component,
  ReactComponentElement,
  ComponentElement,
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ClosestStationContainer from './ClosestStationContainer';
import { GooglePlacesStation } from '../contract/geolocation';
import { primary, secondary, text } from '../constants/colors';
import Avatar from './Avatar';

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
        photoReference={station.photos && station.photos[0].photo_reference}>
        {(url: string, distance: number): React.ReactNode => (
          <TouchableWithoutFeedback onPress={this.props.onPress}>
            <View style={styles.container}>
              <Avatar url={url} name={station.name} />
              <View style={styles.textSpace}>
                <Text style={styles.stationName}>
                  {station && station.name}
                </Text>
                <Text style={styles.stationAddress}>
                  {station && station.vicinity}
                </Text>
                <Text style={styles.stationAddress}>
                  {station && `${distance} Km`}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </ClosestStationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '85%',
    padding: 2,
    height: 85,
    backgroundColor: secondary.light,
    top: '80%',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textSpace: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  stationName: {
    fontWeight: 'bold',
    color: text.label,
  },
  avatar: {
    width: 52,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationAddress: {
    textAlign: 'center',
    color: text.content,
  },
});
