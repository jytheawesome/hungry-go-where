import { useState, useEffect } from "react";
import styles from "./App.module.css";
import NearestFood from "../restaurants/NearestFood";
import FoodSearchBar from "../restaurants/food-search-bar/FoodSearchBar";
import SearchedFood from "../restaurants/SearchedFood";
import SuggestedFood from "../restaurants/SuggestedFood";
import { Position, PositionError } from "../custom-ds/custom";

function App() {
  //Declarations

  // user location
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  // user search keywords
  const [searchString, setSearchString] = useState("");
  // Restaurant display view
  const [seeNearestFood, toggleSeeNearestFood] = useState(false);
  const [seeSuggestedFood, toggleSeeSuggestedFood] = useState(false);
  const [seeSearchedFood, toggleSeeSearchedFood] = useState(false);

  const restaurantDisplaySelector = (selector: string) => {
    if (selector == "Nearest") {
      toggleSeeNearestFood(true);
      toggleSeeSearchedFood(false);
      toggleSeeSuggestedFood(false);
    } else if (selector == "Searched") {
      toggleSeeNearestFood(false);
      toggleSeeSearchedFood(true);
      toggleSeeSuggestedFood(false);
    } else if (selector == "Suggested") {
      toggleSeeNearestFood(false);
      toggleSeeSearchedFood(false);
      toggleSeeSuggestedFood(true);
    } else {
      toggleSeeNearestFood(false);
      toggleSeeSearchedFood(false);
      toggleSeeSuggestedFood(false);
    }
  };

  // handler for submitting search keywords
  const onSubmitSearch = (searchString: string) => {
    setSearchString(searchString);
    restaurantDisplaySelector("Searched");
  };

  // define success function for getting user location
  function successCallback(position: Position) {
    console.log("Successfully retrieved user location.");
    const { latitude, longitude } = position.coords;
    setUserLocation({ longitude, latitude });
  }

  // define failure function for getting user location
  function errorCallback(error: PositionError) {
    console.log(error, "Error getting user location.");
  }

  //Get user's current location via browser (no dependencies, only run once)
  useEffect(() => {
    if (navigator.geolocation) {
      // if Geolocation is supported by browser
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitSearch={onSubmitSearch} />
        <div className={styles.buttonsContainer}>
          <button
            className={
              seeNearestFood ? styles.buttonHighlight : styles.buttonDefault
            }
            onClick={() => restaurantDisplaySelector("Nearest")}
          >
            See restaurants near me
          </button>
          <button
            className={
              seeSuggestedFood ? styles.buttonHighlight : styles.buttonDefault
            }
            onClick={() => restaurantDisplaySelector("Suggested")}
          >
            See restaurants based on my past searches
          </button>
        </div>
        <div className={styles.restaurantsContainer}>
          {seeNearestFood && (
            <NearestFood
              userLocation={userLocation}
              onClickClose={() => restaurantDisplaySelector("Close")}
            />
          )}
          {seeSearchedFood && (
            <SearchedFood
              onClickClose={() => restaurantDisplaySelector("Close")}
              searchString={searchString}
              userLocation={userLocation}
            />
          )}
          {seeSuggestedFood && (
            <SuggestedFood
              onClickClose={() => restaurantDisplaySelector("Close")}
              location={userLocation}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default App;
