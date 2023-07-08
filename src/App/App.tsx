import {useState} from "react";
import styles from "./App.module.css";
import NearestFood from "../nearest-food-display/NearestFood";
import FoodSearchBar from "../food-search-bar/FoodSearchBar";
import SearchedFood from "../searched-food-display/SearchedFood";

function App() {
  // user search keywords
  const [searchString, setSearchString] = useState("");
  // user location
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  // handler for submitting search keywords
  const onSubmitSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  // handler for receiving user location
  const onReceiveLocation = (location: {
    latitude: number;
    longitude: number;
  }) => {
    setUserLocation(location);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitSearch={onSubmitSearch} />
        <div className={styles.restaurantsContainer}>
          <NearestFood onReceiveLocation={onReceiveLocation} />
          <SearchedFood searchString={searchString} location={userLocation} />
        </div>
      </div>
    </>
  );
}
export default App;
