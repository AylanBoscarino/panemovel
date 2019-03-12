import { getCenter } from 'geolib';
import { LatLng } from 'react-native-maps';

export function getCenterPosition(start: LatLng, end: LatLng): LatLng {
  return getCenter([start, end]);
}
