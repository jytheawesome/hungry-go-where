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

  // handler for submitting search keywords
  const onSubmitSearch = (searchString: string) => {
    setSearchString(searchString);
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
        <div className={styles.restaurantsContainer}>
          <NearestFood userLocation={userLocation} />
          <SearchedFood searchString={searchString} location={userLocation} />
        </div>
        <SuggestedFood location={userLocation} />
      </div>
    </>
  );
}
export default App;
