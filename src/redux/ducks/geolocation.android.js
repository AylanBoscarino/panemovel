import Geolocation from 'react-native-geolocation-service';

import fineLocation from '../../permissions/fineLocation';
import { urlFindNearbyStations } from '../../constants';

// TYPES
const GEOLOCATION_GRANT_PERMISSION = 'panemovel/geolocation/grant-permission';
const GEOLOCATION_STORE_POSITION = 'panemovel/geolocation/store-position';
const GEOLOCATION_STORE_WATCH_ID = 'panemovel/geolocation/store-watch-id';
const GEOLOCATION_CLEAR_WATCH = 'panemovel/geolocation/clear-watch';
const GEOLOCATION_FIND_NEARBY_STATIONS =
  'panemovel/geolocation/find-nearby-stations';
const GEOLOCATION_SELECT_STATION = 'panemovel/geolocation/select-station';
const GEOLOCATION_CREATE_DIRECTION = 'panemovel/geolocation/create-direction';

// REDUCER
const initialState = {
  grantedPermission: false,
  location: {
    latitude: -42.983068,
    longitude: -43.3614,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0051,
  },
  direction: {
    isGivingDirection: false,
    latitude: null,
    longitude: null,
  },
  nearbyStations: null,
  selectedStation: null,
  watchId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GEOLOCATION_GRANT_PERMISSION:
      return { ...state, ...payload };

    case GEOLOCATION_STORE_POSITION:
      return { ...state, location: { ...state.location, ...payload } };

    case GEOLOCATION_CLEAR_WATCH:
      return { ...state, ...payload };

    case GEOLOCATION_STORE_WATCH_ID:
      return { ...state, ...payload };

    case GEOLOCATION_FIND_NEARBY_STATIONS:
      return { ...state, ...payload };

    case GEOLOCATION_SELECT_STATION:
      return {
        ...state,
        selectedStation: payload.selectedStation,
        direction: {
          ...state.direction,
          ...payload.direction,
        },
      };

    case GEOLOCATION_CREATE_DIRECTION:
      return { ...state, direction: { ...state.direction, ...payload } };

    default:
      return state;
  }
};

// ACTIONS

export function geolocationGrantPermission() {
  return async dispatch => {
    const grantedPermission = await fineLocation();
    dispatch({
      type: GEOLOCATION_GRANT_PERMISSION,
      payload: {
        grantedPermission,
      },
    });
  };
}

export function geolocationStoreWatchId(watchId) {
  return dispatch =>
    dispatch({
      type: GEOLOCATION_STORE_WATCH_ID,
      payload: { watchId },
    });
}

export function geolocationClearWatch(watchId) {
  return dispatch => {
    Geolocation.clearWatch(watchId);
    Geolocation.stopObserving();
    dispatch({
      type: GEOLOCATION_CLEAR_WATCH,
      payload: { watchId: null },
    });
  };
}

export function geolocationStorePosition(findStation) {
  return dispatch => {
    const watchId = Geolocation.watchPosition(
      position => {
        dispatch({
          type: GEOLOCATION_STORE_POSITION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        findStation();
      },
      {
        enableHighAccuracy: true,
        showLocationDialog: true,
        fastestInterval: 999,
        interval: 1000,
        distanceFilter: 0,
      }
    );
    return geolocationStoreWatchId(watchId)(dispatch);
  };
}

export function geolocationFindNearbyStations(latitude, longitude) {
  return async dispatch => {
    const url = urlFindNearbyStations(latitude, longitude);
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: GEOLOCATION_FIND_NEARBY_STATIONS,
      payload: {
        nearbyStations: data.results,
        selectedStation: data.results[0],
      },
    });
  };
}

export function geolocationSelectStation(station) {
  return dispatch =>
    dispatch({
      type: GEOLOCATION_SELECT_STATION,
      payload: {
        selectedStation: station,
        direction: {
          latitude: station.geometry.location.lat,
          longitude: station.geometry.location.lng,
        },
      },
    });
}

export function geolocationCreateDirection() {
  return dispatch => {
    dispatch({
      type: GEOLOCATION_CREATE_DIRECTION,
      payload: { isGivingDirection: true },
    });
  };
}
