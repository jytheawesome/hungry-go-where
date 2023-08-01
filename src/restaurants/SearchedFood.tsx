//import { useEffect, useState } from "react";
//import axios from "axios";
//import RestaurantDisplay from "./restaurant-display/RestaurantDisplay";
// import { Restaurant } from "../custom";

import RestaurantDisplay from "./restaurant-display/RestaurantDisplay";

interface Props {
  searchString: string;
  location: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const SearchedFood = ({ searchString, location, onClickClose }: Props) => {
  console.log("Coordinates for searched restaurants: " + location);

  /*
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
    const latitude = location.latitude;
    const longitude = location.longitude;

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
*/
  return (
    <>
      {searchString == "" || searchString == " Search for a restaurant" ? (
        <p>No restaurants.</p>
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage={`Restaurants based on your search term: ${searchString}`}
          restaurants={[]}
        />
      )}
    </>
  );
};

export default SearchedFood;
