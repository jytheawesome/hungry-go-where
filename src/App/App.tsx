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
      <div className="relative flex flex-col items-center justify-center p-5 font-sans">
        <img src="/restaurantCartoon.png" className="w-52 h-52" alt="Logo" />
        <div className="text-6xl font-sans my-2 mb-8">Hungry Go Where? </div>
        <Restaurants userLocation={userLocation} />
      </div>
      {/* <div className={styles.mainContainer}></div> */}
    </>
  );
}
export default App;

