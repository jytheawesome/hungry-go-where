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

interface Position {
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

interface PositionError {
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

// Restaurant interface
interface Restaurant {
  name: string;
  vicinity: string;
}
