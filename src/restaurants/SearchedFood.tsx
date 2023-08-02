import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantDisplay from "./restaurant-display/RestaurantDisplay";
import { Restaurant } from "../custom-ds/custom";
import NoRestaurantsDisplay from "./restaurant-display/noRestaurantsDisplay";

interface Props {
  searchString: string;
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const SearchedFood = ({ searchString, userLocation, onClickClose }: Props) => {
  console.log(
    "Coordinates for searched restaurants: " +
      userLocation.latitude +
      " " +
      userLocation.longitude
  );

  //Set variable for nearest restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  //Define function to search for restaurants based on keyword from backend server
  const fetchSearchedRestaurants = async (
    keyword: string,
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `https://hungry-go-where-api.vercel.app/api/search-restaurants?latitude=${latitude}&longitude=${longitude}&keyword=${keyword}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        `Successfully searched for restaurants based on keyword. Total: ${results.length}`
      );
      return results;
    } catch (error) {
      console.error(
        "Error faced searching for restaurants based on keyword: ",
        error
      );
      return [];
    }
  };

  //Fetch searched restaurants
  useEffect(() => {
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;

    fetchSearchedRestaurants(searchString, latitude, longitude)
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error(
          "Error faced searching for restaurants based on keyword: ",
          error
        );
      });
  }, [searchString]);

  return (
    <>
      {searchString == "" ||
      searchString == " Search for a restaurant" ||
      restaurants.length == 0 ? (
        <NoRestaurantsDisplay displayMessage="Oops! Your search did not yield any restaurants." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage={`Restaurants based on your search term: ${searchString}`}
          restaurants={restaurants}
        />
      )}
    </>
  );
};

export default SearchedFood;
