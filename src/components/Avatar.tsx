import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { secondary, primary } from '../constants/colors';
import { getInitials } from '../service/geolocation';

interface Props {
  url: string;
  name?: string;
}

interface State {
  imageWorks: boolean;
}

export default class Avatar extends Component<Props, State> {
  state = {
    imageWorks: false,
  };
  async componentDidMount() {
    // const response = await fetch(this.props.url);
    // this.setState({
    //   imageWorks: response.status === 200,
    // });
  }
  render() {
    const { url, name } = this.props;
    const { imageWorks } = this.state;
    const initials = name && getInitials(name);
    return (
      <View style={styles.avatar}>
        {/* <Image style={styles.image} source={{ uri: url }} /> */}

        {/* {imageWorks ? (
          <>
            <Image style={styles.image} source={{ uri: url }} />
          </>
        ) : (
          <View style={styles.textAvatarContainer}>
            <Text style={styles.textAvatar}>{name && name[0]}</Text>
          </View>
        )} */}
        <View style={styles.textAvatarContainer}>
            <Text style={styles.textAvatar}>{initials}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 52,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textAvatar: {
    fontSize: 26,
    fontFamily: 'roboto',
    textAlign: 'center',
    color: '#fff',
  },
  textAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
