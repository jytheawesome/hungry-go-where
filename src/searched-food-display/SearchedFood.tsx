import {useEffect, useState} from "react";
import styles from "./SearchedFood.module.css";
import axios from "axios";

interface Props {
  searchString: string;
}

const SearchedFood = ({searchString}: Props) => {
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
    const url = `http://localhost:3001/api/search-restaurants?latitude=${latitude}&longitude=${longitude}&keyword=${keyword}`;
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
    const latitude = 1.28944;
    const longitude = 103.849983;

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
      <h2>Restaurants nearest to you based on your search: {searchString}</h2>
      <ul className={styles.restaurantDisplay}>
        {restaurants.map((restaurant) => (
          <li key={`${restaurant.name}-${restaurant.vicinity}`}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.vicinity}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchedFood;