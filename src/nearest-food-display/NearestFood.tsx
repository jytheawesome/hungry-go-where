import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./NearestFood.module.css";

interface Props {
  onReceiveLocation: (location: {latitude: number; longitude: number}) => void;
}

const NearestFood = ({onReceiveLocation}: Props) => {
  //Set variable for user's current location
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  //Get user's current location via browser
  useEffect(() => {
    function successCallback(position: Position) {
      console.log("Successfully retrieved user location.");
      const {latitude, longitude} = position.coords;
      setUserLocation({latitude, longitude});
      onReceiveLocation({latitude, longitude});
    }

    function errorCallback(error: PositionError) {
      console.log(error, "Error getting user location.");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  }, []);

  //Set variable for nearest restaurants
  interface Restaurant {
    name: string;
    vicinity: string;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  //Define function to fetch nearest restaurants from backend server
  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `https://hungry-go-where-api.vercel.app/api/nearby-restaurants?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        `Successfully found nearest restaurants. Total: ${results.length}`
      );
      return results;
    } catch (error) {
      console.error("Error finding nearest restaurants:", error);
      return [];
    }
  };

  //Fetch nearby restaurants
  useEffect(() => {
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;

    fetchNearbyRestaurants(latitude, longitude)
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error finding nearest restaurants:", error);
      });
  }, [userLocation]);

  return (
    <>
      <div className={styles.nearestRestaurantDisplay}>
        <h3>
          Your coordinates are {userLocation.latitude} and{" "}
          {userLocation.longitude}. Restaurants that are closest to you:
        </h3>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={`${restaurant.name}-${restaurant.vicinity}`}>
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
