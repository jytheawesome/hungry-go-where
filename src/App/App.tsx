import {useState, useEffect} from "react";
import styles from "./App.module.css";
import NearestFood from "../nearest-food-display/NearestFood";
import FoodSearchBar from "../food-search-bar/FoodSearchBar";
import SearchedFood from "../searched-food-display/SearchedFood";
import SuggestedFood from "../suggested-food/SuggestedFood";

function App() {
  //Declarations

  // user location
  const [userLocation, setUserLocation] = useState({longitude: 0, latitude: 0});
  // user search keywords
  const [searchString, setSearchString] = useState("");
  const [seeNearestFood, toggleSeeNearestFood] = useState(false);
  const [seeRecommendedFood, toggleSeeRecommendedFood] = useState(false);
  const [seeSearchedFood, toggleSeeSearchedFood] = useState(false);

  const onClickSeeNearest = () => {
    toggleSeeNearestFood(true);
    toggleSeeSearchedFood(false);
    toggleSeeRecommendedFood(false);
  };

  const onClickSeeRecommended = () => {
    toggleSeeNearestFood(false);
    toggleSeeSearchedFood(false);
    toggleSeeRecommendedFood(true);
  };

  const onClickCloseNearest = () => {
    toggleSeeNearestFood(false);
  };

  const onClickCloseRecommended = () => {
    toggleSeeRecommendedFood(false);
  };

  const onClickCloseSearched = () => {
    toggleSeeSearchedFood(false);
  };

  // handler for submitting search keywords
  const onSubmitSearch = (searchString: string) => {
    setSearchString(searchString);
    toggleSeeSearchedFood(true);
    toggleSeeNearestFood(false);
    toggleSeeRecommendedFood(false);
  };

  // define success function for getting user location
  function successCallback(position: Position) {
    console.log("Successfully retrieved user location.");
    const {latitude, longitude} = position.coords;
    setUserLocation({longitude, latitude});
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
              seeNearestFood
                ? styles.seeNearestRestaurantsButtonHighlighted
                : styles.seeNearestRestaurantsButton
            }
            onClick={onClickSeeNearest}
          >
            See restaurants near me
          </button>
          <button
            className={
              seeRecommendedFood
                ? styles.seeRecommendedRestaurantsButtonHighlighted
                : styles.seeRecommendedRestaurantsButton
            }
            onClick={onClickSeeRecommended}
          >
            See restaurants based on my past searches
          </button>
        </div>
        <div className={styles.restaurantsContainer}>
          {seeNearestFood && (
            <NearestFood
              userLocation={userLocation}
              onClickClose={onClickCloseNearest}
            />
          )}
          {seeSearchedFood && (
            <SearchedFood
              onClickClose={onClickCloseSearched}
              searchString={searchString}
              location={userLocation}
            />
          )}
        </div>
        {seeRecommendedFood && (
          <SuggestedFood
            onClickClose={onClickCloseRecommended}
            location={userLocation}
          />
        )}
      </div>
    </>
  );
}
export default App;
