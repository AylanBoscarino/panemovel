import Geolocation from 'react-native-geolocation-service';

import { urlFindNearbyStations } from '../../constants';
import fineLocation from '../../permissions/fineLocation';
import { GooglePlacesStation } from '../../contract/geolocation';
import { MapsLocation } from '../../contract/geolocation';
import { Region, LatLng } from 'react-native-maps';

// TYPES
const GEOLOCATION_GRANT_PERMISSION = 'panemovel/geolocation/grant-permission';
const GEOLOCATION_STORE_POSITION = 'panemovel/geolocation/store-position';
const GEOLOCATION_STORE_WATCH_ID = 'panemovel/geolocation/store-watch-id';
const GEOLOCATION_CLEAR_WATCH = 'panemovel/geolocation/clear-watch';
const GEOLOCATION_FIND_NEARBY_STATIONS =
  'panemovel/geolocation/find-nearby-stations'; 
const GEOLOCATION_SELECT_STATION = 'panemovel/geolocation/select-station';
const GEOLOCATION_CREATE_DIRECTION = 'panemovel/geolocation/create-direction';
const GEOLOCATION_ALTER_MAP_ZOOM = 'panemovel/geolocation/alter-map-zoom';
const GEOLOCATION_ALTER_MAP_POSITION =
  'panemovel/geolocation/alter-map-position';
const GEOLOCATION_DISTANCE_FROM_STATION =
  'panemovel/geolocation/distance-from-station';

interface GeolocationAction {
  type: string;
  payload: any;
}

export type Dispatch = (action: GeolocationAction) => void;

export interface GeolocationState {
  direction: {
    isGivingDirection: boolean;
    latitude: number;
    longitude: number;
    distance: number;
  };
  grantedPermission: boolean;
  location: Region;
  nearbyStations: GooglePlacesStation[];
  selectedStation: GooglePlacesStation;
  watchId: string;
}

// REDUCER
const initialState: GeolocationState = {
  direction: {
    isGivingDirection: true,
    latitude: 0,
    longitude: 0,
    distance: 0,
  },
  grantedPermission: false,
  location: {
    latitude: -42.983068,
    latitudeDelta: 0.0122,
    longitude: -43.3614,
    longitudeDelta: 0.0151,
  },
  nearbyStations: [],
  selectedStation: {
    id: '',
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
    photos: [],
  },
  watchId: '',
};

export default (state = initialState, { type, payload }: GeolocationAction) => {
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
          ...state.direction,
          ...payload.direction,
        },
      };

    case GEOLOCATION_CREATE_DIRECTION:
      return { ...state, direction: { ...state.direction, ...payload } };

    case GEOLOCATION_ALTER_MAP_ZOOM:
      return {
        ...state,
        location: {
          ...state.location,
          ...payload,
        },
      };

    case GEOLOCATION_ALTER_MAP_POSITION:
      console.log({ payload });
      return {
        ...state,
        location: {
          latitude: parseFloat(payload.latitude),
          longitude: parseFloat(payload.longitude),
          ...state.location,
        },
      };

    case GEOLOCATION_DISTANCE_FROM_STATION:
      return {
        ...state,
        direction: {
          ...state.direction,
          distance: payload,
        },
      };

    default:
      return state;
  }
};

// ACTIONS

export function geolocationGrantPermission() {
  return async (dispatch: Dispatch) => {
    const grantedPermission = await fineLocation();
    dispatch({
      type: GEOLOCATION_GRANT_PERMISSION,
      payload: {
        grantedPermission,
      },
    });
  };
}

export function geolocationStoreWatchId(watchId: string) {
  return (dispatch: Dispatch) =>
    dispatch({
      type: GEOLOCATION_STORE_WATCH_ID,
      payload: { watchId },
    });
}

export function geolocationClearWatch(watchId: string) {
  return (dispatch: Dispatch): void => {
    Geolocation.clearWatch(watchId);
    Geolocation.stopObserving();
    dispatch({
      type: GEOLOCATION_CLEAR_WATCH,
      payload: { watchId: null },
    });
  };
}

export function geolocationStorePosition(findStation: () => void) {
  return (dispatch: Dispatch) => {
    const watchId = Geolocation.watchPosition(
      (position: any) => {
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

export function geolocationFindNearbyStations(
  latitude: number,
  longitude: number
): (dispatch: Dispatch) => Promise<void> {
  return async (dispatch: Dispatch): Promise<void> => {
    const url = urlFindNearbyStations(latitude, longitude);
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: GEOLOCATION_FIND_NEARBY_STATIONS,
      payload: {
        nearbyStations: data.results,
        selectedStation: data.results[0],
      },
    });
    geolocationSelectStation(data.results[0])(dispatch);
  };
}

export function geolocationSelectStation(station: GooglePlacesStation) {
  return (dispatch: Dispatch) =>
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
  return (dispatch: Dispatch) => {
    dispatch({
      type: GEOLOCATION_CREATE_DIRECTION,
      payload: { isGivingDirection: true },
    });
  };
}

export function geolocationAlterMapZoom(start: LatLng, end: LatLng) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GEOLOCATION_ALTER_MAP_ZOOM,
      payload: {
        latitudeDelta: Math.abs(start.latitude - end.latitude),
        longitudeDelta: Math.abs(start.longitude - end.longitude),
      },
    });
  };
}

export function geolocationAlterMapPosition(coordinates: LatLng) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GEOLOCATION_ALTER_MAP_POSITION,
      payload: coordinates,
    });
  };
}

export function geolocationDistanceFromStation(distance: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: GEOLOCATION_DISTANCE_FROM_STATION,
      payload: distance,
    });
  };
}
