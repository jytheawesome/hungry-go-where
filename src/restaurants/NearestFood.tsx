// import { useState, useEffect } from "react";
// import axios from "axios";
import RestaurantDisplay from "./restaurant-display/RestaurantDisplay";
// import { Restaurant, dummyRestaurant } from "../custom";

interface Props {
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const NearestFood = ({ userLocation, onClickClose }: Props) => {
  // Declarations
  console.log("Coordinates for nearest restaurants: " + userLocation);
  /*
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  //const apiKey = process.env.maps_api;
  const apiKey = "AIzaSyByYmhlaUy0wx7xIb8J50vNAER2MPF8jns";

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
  */

  return (
    <RestaurantDisplay
      onClickClose={onClickClose}
      headerMessage="Restaurants that are closest to you: "
      restaurants={[]}
    />
  );
};

export default NearestFood;
