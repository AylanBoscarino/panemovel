import Config from 'react-native-config';

export const constants = {
  GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY,
  TYPE: 'gas_station',
  LANGUAGE: 'pt-BR',
  RADIUS: '5000',
  RANK_BY: 'rankby=distance',
  NEARBY_SEARCH_URL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
};

export function urlFindNearbyStations(latitude, longitude) {
  return (
    constants.NEARBY_SEARCH_URL +
    `&location=${latitude},${longitude}` +
    `&radius=${constants.RADIUS}` +
    // `&${constants.RANK_BY}` +
    `&type=${constants.TYPE}` +
    `&key=${constants.GOOGLE_MAPS_API_KEY}`
  );
}
