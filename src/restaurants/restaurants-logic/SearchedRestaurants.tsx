import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantDisplay from "../restaurants-display/RestaurantsDisplay";
import { Restaurant } from "../../custom-ds/custom";
import NoRestaurantsFound from "../restaurants-display/NoRestaurantsFound";
import SearchingIndicator from "../restaurants-display/SearchingRestaurantsIndicator";

interface Props {
  searchString: string;
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

const SearchedRestaurants = ({
  searchString,
  userLocation,
  onClickClose,
}: Props) => {
  console.log(
    "Coordinates for searched restaurants: " +
      userLocation.latitude +
      " " +
      userLocation.longitude
  );

  //Set variable for nearest restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [seeSearchedRestaurants, toggleSeeSearchedRestaurants] =
    useState(false);

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
    toggleSeeSearchedRestaurants(false);
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;

    fetchSearchedRestaurants(searchString, latitude, longitude)
      .then((data) => {
        setRestaurants(data);
        toggleSeeSearchedRestaurants(true);
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
      {!seeSearchedRestaurants ? (
        <SearchingIndicator />
      ) : searchString == "" || searchString == " Search for a restaurant" ? (
        <NoRestaurantsFound displayMessage="Oops! Your search bar seems to be empty." />
      ) : restaurants.length == 0 ? (
        <NoRestaurantsFound displayMessage="Oops! We could not find any restaurants." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage={`Restaurants based on your search term: ${searchString} `}
          restaurants={restaurants}
        />
      )}
    </>
  );
};

export default SearchedRestaurants;
