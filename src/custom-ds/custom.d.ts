/*
  Custom interfaces.
*/

interface Navigator {
  geolocation?: Geolocation;
}

interface Geolocation {
  getCurrentPosition: (
    successCallback: PositionCallback,
    errorCallback?: PositionErrorCallback,
    options?: PositionOptions
  ) => void;
}

export interface Position {
  coords: Coordinates;
  timestamp: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

type PositionCallback = (position: Position) => void;
type PositionErrorCallback = (error: PositionError) => void;

export interface PositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

interface PositionOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export interface Restaurant {
  name: string;
  vicinity: string;
  photos: Photo[];
}

export interface dummyRestaurant {
  name: string;
  vicinity: string;
  photo: string;
}
