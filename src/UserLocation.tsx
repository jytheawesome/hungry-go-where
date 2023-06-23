import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./UserLocation.module.css";

const UserLocation = () => {
  //Current user location
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  function successCallback(position: Position) {
    const {latitude, longitude} = position.coords;
    setLocation({latitude, longitude});
  }

  function errorCallback(error: PositionError) {
    console.log("Error getting location");
  }

  //Retrieve nearest restaurants
  interface Restaurant {
    name: string;
    vicinity: string;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `http://localhost:3001/api/places?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        "Successfully connected to backend server and retrieved restaurants."
      );
      console.log(results);
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
    const latitude = location.latitude; // Replace with the actual latitude
    const longitude = location.longitude; // Replace with the actual longitude

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
      <div className={styles.container}>
        <h2>
          You are located in {location.latitude} and {location.longitude}
        </h2>
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

export default UserLocation;
