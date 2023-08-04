import { useState, useEffect } from "react";
import styles from "./App.module.css";
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
      <div className={styles.mainContainer}>
        <img className={styles.logoPhoto} src="/restaurantCartoon.png" />
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <Restaurants userLocation={userLocation} />
      </div>
    </>
  );
}
export default App;

