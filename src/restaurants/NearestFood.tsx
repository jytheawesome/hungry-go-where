import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantDisplay from "./restaurant-display/RestaurantDisplay";
import { Restaurant } from "../custom-ds/custom";
import NoRestaurantsDisplay from "./restaurant-display/noRestaurantsDisplay";
import SearchingForRestaurants from "./restaurant-display/SearchingForRestaurants";
//import NoRestaurantsDisplay from "./restaurant-display/noRestaurantsDisplay";

interface Props {
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const NearestFood = ({ userLocation, onClickClose }: Props) => {
  // Declarations
  console.log(
    "Coordinates for nearest restaurants: " +
      userLocation.latitude +
      " " +
      userLocation.longitude
  );

  const [seeNearestFood, toggleSeeNearestFood] = useState(false);

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
        toggleSeeNearestFood(true);
      })
      .catch((error) => {
        console.error("Error finding nearest restaurants:", error);
      });
  }, [userLocation]);

  return (
    <>
      {!seeNearestFood ? (
        <SearchingForRestaurants />
      ) : restaurants.length == 0 ? (
        <NoRestaurantsDisplay displayMessage="Oops! We could not find any restaurants." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage="Restaurants that are closest to you: "
          restaurants={restaurants}
        />
      )}
    </>
  );
  {
    /*
    <>
      {restaurants.length == 0 ? (
        <NoRestaurantsDisplay displayMessage="Oops! There are no nearest restaurants near you at the moment." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage="Restaurants that are closest to you: "
          restaurants={restaurants}
        />
      )}
    </>
      */
  }
};

export default NearestFood;
