import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./NearestFood.module.css";

const NearestFood = () => {
  //Get user's current location
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  }, []);

  function successCallback(position: Position) {
    console.log("Successfully retrieved user location.");
    const {latitude, longitude} = position.coords;
    setUserLocation({latitude, longitude});
  }

  function errorCallback(error: PositionError) {
    console.log("Error getting user location");
  }

  //Retrieve nearest restaurants
  interface Restaurant {
    name: string;
    vicinity: string;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  //Fetch nearest restaurants from backend server
  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `http://localhost:3001/api/places?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        `Successfully connected to backend server and retrieved restaurants. Number of restaurants: ${results.length}`
      );
      return results;
    } catch (error) {
      console.error(
        "Error faced connecting to backend server to retrieve restaurants:",
        error
      );
      return [];
    }
  };

  useEffect(() => {
    // Fetch nearby restaurants when the component mounts
    const latitude = userLocation.latitude; // Replace with the actual latitude
    const longitude = userLocation.longitude; // Replace with the actual longitude

    fetchNearbyRestaurants(latitude, longitude)
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.log("Error fetch restaurants.");
      });
  }, []);

  return (
    <>
      <div>
        {/* <h2>
          You are located in {userLocation.latitude} and{" "}
          {userLocation.longitude}
        </h2> */}
        <h2>Restaurants that are close to you:</h2>
        <ul className={styles.restaurantDisplay}>
          {restaurants.map((restaurant) => (
            <li key={restaurant.name}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.vicinity}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NearestFood;
