import { useState, useEffect } from "react";
import axios from "axios";
import { getExistingQueries } from "../../cookies/cookie";
import { Restaurant } from "../../custom-ds/custom";
import RestaurantDisplay from "../restaurants-display/RestaurantsDisplay";
import NoRestaurantsFound from "../restaurants-display/NoRestaurantsFound";
import SearchingIndicator from "../restaurants-display/SearchingRestaurantsIndicator";

// declarations

// Props for component
interface Props {
  location: { latitude: number; longitude: number };
  onClickClose: () => void;
}

//Define function to search for restaurants based on past searches from backend server
const fetchSuggestedRestaurantsByQuery = async (
  keyword: string,
  latitude: number,
  longitude: number
): Promise<any[]> => {
  const url = `https://hungry-go-where-api.vercel.app/api/search-restaurants?latitude=${latitude}&longitude=${longitude}&keyword=${keyword}`;
  try {
    const response = await axios.get(url);
    // only get 2 restaurants per query
    const results = response.data.results.slice(0, 2);
    console.log(results.length);
    return results;
  } catch (error) {
    console.error(
      "Error faced searching for restaurants based on a query: ",
      error
    );
    return [];
  }
};

const fetchSuggestedRestaurants = async (
  searchQueries: string[],
  latitude: number,
  longitude: number
): Promise<any[]> => {
  const allResults = [];

  for (const query of searchQueries) {
    const results = await fetchSuggestedRestaurantsByQuery(
      query,
      latitude,
      longitude
    );
    allResults.push(...results);
  }

  console.log(
    `Successfully searched for restaurants based on past queries. Total: ${allResults.length}`
  );
  return allResults;
};

// Component
const SuggestedRestaurants = ({ location, onClickClose }: Props) => {
  //Set variable for suggested restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [seeSuggestedRestaurants, toggleSeeSuggestedRestaurants] =
    useState(false);

  //Fetch suggested restaurants
  useEffect(() => {
    toggleSeeSuggestedRestaurants(false);
    const latitude = location.latitude;
    const longitude = location.longitude;
    const pastQueriesResult = getExistingQueries();
    console.log(pastQueriesResult);
    if (latitude == 0 || longitude == 0) return;

    fetchSuggestedRestaurants(pastQueriesResult, latitude, longitude)
      .then((data) => {
        setRestaurants(data);
        toggleSeeSuggestedRestaurants(true);
      })
      .catch((error) => {
        console.error(
          "Error faced searching for restaurants based on past searches: ",
          error
        );
      });
  }, [location]);

  return (
    <>
      {!seeSuggestedRestaurants ? (
        <SearchingIndicator />
      ) : getExistingQueries().length == 0 ? (
        <NoRestaurantsFound displayMessage="Oops! It appears you do not have any past searches." />
      ) : restaurants.length == 0 ? (
        <NoRestaurantsFound displayMessage="Oops! We could not find any restaurants." />
      ) : (
        <RestaurantDisplay
          onClickClose={onClickClose}
          headerMessage="Restaurants based on your past searches: "
          restaurants={restaurants}
        />
      )}
    </>
  );
};

export default SuggestedRestaurants;
