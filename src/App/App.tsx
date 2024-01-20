import { useState, useEffect } from "react";
import { Position, PositionError } from "../custom-ds/custom";
import Restaurants from "../restaurants/Restaurants";

function App() {
  // Declare user location variable
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  // define success function for getting user location
  function successCallback(position: Position) {
    console.log("Successfully retrieved user location.");
    const { latitude, longitude } = position.coords;
    setUserLocation({ longitude, latitude });
  }

  // define failure function for getting user location
  function errorCallback(error: PositionError) {
    console.log(error, "Error getting user location.");
  }

  //Get user's current location via browser (no dependencies, only run once)
  useEffect(() => {
    if (navigator.geolocation) {
      // if Geolocation is supported by browser
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  }, []);

  return (
    <>
      <div className="relatve flex flex-col items-center justify-center font-sans p-5">
        <div className="flex flex-row items-center my-8">
          <img src="/restaurantCartoon.png" className="w-16 h-16" alt="Logo" />
          <div className="text-3xl pl-6 font-semibold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Hungry Go Where?{" "}
          </div>
        </div>
        <Restaurants userLocation={userLocation} />
      </div>
    </>
  );
}
export default App;
