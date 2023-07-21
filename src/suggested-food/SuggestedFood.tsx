import {useState, useEffect} from "react";
import styles from "./SuggestedFood.module.css";
import axios from "axios";
import {getExistingQueries} from "../cookie";

// declarations

// Props for component
interface Props {
  location: {latitude: number; longitude: number};
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
const SuggestedFood = ({location, onClickClose}: Props) => {
  //Set variable for suggested restaurants
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  //const [pastQueries] = useState<string[]>(getExistingQueries());

  //Fetch suggested restaurants
  useEffect(() => {
    const latitude = location.latitude;
    const longitude = location.longitude;
    const pastQueriesResult = getExistingQueries();
    console.log(pastQueriesResult);
    if (latitude == 0 || longitude == 0) return;

    fetchSuggestedRestaurants(pastQueriesResult, latitude, longitude)
      .then((data) => {
        setRestaurants(data);
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
      <div className={styles.suggestedRestaurantsContainer}>
        <button onClick={onClickClose} className={styles.closeButton}>
          Close
        </button>
        <h3>Suggested restaurants based on your past searches: </h3>
        {restaurants.length == 0 ? (
          <h3> You do not have any past searches. </h3>
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

export default SuggestedFood;
