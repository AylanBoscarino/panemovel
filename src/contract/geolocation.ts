export interface GooglePlacesStation {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  icon?: string;
  id?: string;
  name?: string;
  opening_hours?: {
    open_now: true;
  };
  photos?: {
    height: number;
    html_attributions: any[];
    photo_reference: string;
    width: number;
  }[];
  place_id?: string;
  scope?: string;
  alt_ids?: {
    place_id: string;
    scope: string;
  }[];
  reference?: string;
  types?: string[];
  vicinity?: string;
}

export interface MapsLocation {
  latitude: number,
  longitude: number,
  latitudeDelta: number | null,
  longitudeDelta: number | null,
}