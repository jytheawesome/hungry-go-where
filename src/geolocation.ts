import {Position, PositionError} from "./custom";

// define success function for getting user location
function successCallback(position: Position) {
  console.log("Successfully retrieved user location.");
  const {latitude, longitude} = position.coords;
  return {latitude, longitude};
}

// define failure function for getting user location
function errorCallback(error: PositionError) {
  console.log(error, "Error getting user location.");
}

// //Get user's current location via browser (no dependencies, only run once)
// useEffect(() => {
//   if (navigator.geolocation) {
//     // if Geolocation is supported by browser
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//   } else {
//     console.log("Geolocation is not supported by the browser.");
//   }
// }, []);
