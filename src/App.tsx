import {useState} from "react";
import FoodSearchBar from "./food-search-bar/FoodSearchBar";
import styles from "./App.module.css";
import NearestFood from "./nearest-food-display/NearestFood";
import SearchedFood from "./searched-food-display/SearchedFood";

function App() {
  //state of user input
  const [searchString, setSearchString] = useState("");
  const [userLocation, setUserLocation] = useState({latitude: 0, longitude: 0});

  const onSubmitHandler = (searchString: string) => {
    setSearchString(searchString);
  };

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
        <FoodSearchBar onSubmitHandler={onSubmitHandler} />
        <NearestFood onReceiveLocation={onReceiveLocation} />
        <SearchedFood searchString={searchString} location={userLocation} />
      </div>
    </>
  );
}
export default App;
