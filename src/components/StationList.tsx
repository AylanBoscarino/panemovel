import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import StationListContainer from './StationListContainer';
import { GooglePlacesStation } from '../contract/geolocation';
import StationListItem from './StationListItem';
import StationListPlaceholder from './StationListPlaceholder';

export default class StationList extends Component {
  render() {
    return (
      <StationListContainer>
        {(nearbyStations: GooglePlacesStation[]) => (
          <FlatList
            ListEmptyComponent={() => <StationListPlaceholder />}
            style={styles.container}
            data={nearbyStations}
            renderItem={({ item }: { item: GooglePlacesStation }) => (
              <StationListItem station={item} />
            )}
            keyExtractor={(item: GooglePlacesStation) => item.id}
          />
        )}
      </StationListContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
