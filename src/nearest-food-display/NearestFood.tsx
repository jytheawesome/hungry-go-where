import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./NearestFood.module.css";

interface Props {
  userLocation: {latitude: number; longitude: number};
}

const NearestFood = ({userLocation}: Props) => {
  // Declarations

  //Set variable for nearest restaurants
  interface Restaurant {
    name: string;
    vicinity: string;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Function to fetch nearest restaurants from backend server
  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `https://hungry-go-where-api.vercel.app/api/nearby-restaurants?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        `Successfully found nearest restaurants. Total: ${results.length}. Coords: ${latitude}, ${longitude}`
      );
      return results;
    } catch (error) {
      console.error("Error finding nearest restaurants:", error);
      return [];
    }
  };

  // fetchNearbyRestaurants(userLocation.latitude, userLocation.longitude)
  //   .then((data) => {
  //     setRestaurants(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error finding nearest restaurants:", error);
  //   });

  //Fetch nearby restaurants.
  useEffect(() => {
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;
    if (latitude == 0 || longitude == 0) return;
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
      <div className={styles.nearestRestaurantsContainer}>
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
