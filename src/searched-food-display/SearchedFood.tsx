import {useEffect, useState} from "react";
import styles from "./SearchedFood.module.css";
import axios from "axios";

interface Props {
  searchString: string;
  location: {latitude: number; longitude: number};
}

const SearchedFood = ({searchString, location}: Props) => {
  //Set variable for nearest restaurants
  interface Restaurant {
    name: string;
    vicinity: string;
  }
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

  return (
    <>
      <div className={styles.searchedRestaurantDisplay}>
        <h3>Restaurants nearest to you based on your search: {searchString}</h3>
        {searchString == "" ? (
          <h3>You did not include a search term yet</h3>
        ) : restaurants.length == 0 ? (
          <p>There were no matching restaurants found!</p>
        ) : (
          <ul>
            {restaurants.map((restaurant) => (
              <li key={`${restaurant.name}-${restaurant.vicinity}`}>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.vicinity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchedFood;
