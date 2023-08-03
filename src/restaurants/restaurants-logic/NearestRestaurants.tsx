import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantDisplay from "../restaurants-display/RestaurantsDisplay";
import { Restaurant } from "../../custom-ds/custom";
import NoRestaurantsFound from "../restaurants-display/NoRestaurantsFound";
import SearchingIndicator from "../restaurants-display/SearchingRestaurantsIndicator";

interface Props {
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const NearestRestaurants = ({ userLocation, onClickClose }: Props) => {
  console.log(
    "Coordinates for nearest restaurants: " +
      userLocation.latitude +
      " " +
      userLocation.longitude
  );

  const [seeNearestRestaurants, toggleSeeNearestRestaurants] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Function to fetch nearest restaurants from backend server
  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `https://hungry-go-where-api.vercel.app/api/nearby-restaurants?latitude=${latitude}&longitude=${longitude}`;
    try {
      console.log(url);
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

  //Fetch nearby restaurants.

  useEffect(() => {
    toggleSeeNearestRestaurants(false);
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;
    if (latitude == 0 || longitude == 0) return;
    fetchNearbyRestaurants(latitude, longitude)
      .then((data) => {
        setRestaurants(data);
        toggleSeeNearestRestaurants(true);
      })
      .catch((error) => {
        console.error("Error finding nearest restaurants:", error);
      });
  }, [userLocation]);

  return (
    <>
      {!seeNearestRestaurants ? (
        <SearchingIndicator />
      ) : restaurants.length == 0 ? (
        <NoRestaurantsFound displayMessage="Oops! We could not find any restaurants." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage="Restaurants that are closest to you: "
          restaurants={restaurants}
        />
      )}
    </>
  );
};

export default NearestRestaurants;
