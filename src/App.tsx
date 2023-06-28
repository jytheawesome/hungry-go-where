import {useState} from "react";
import FoodSearchBar from "./food-search-bar/FoodSearchBar";
import styles from "./App.module.css";
import NearestFood from "./nearest-food-display/NearestFood";
import SearchedFood from "./searched-food-display/SearchedFood";

function App() {
  //state of user input
  const [searchString, setSearchString] = useState("chinese");
  const onSubmitHandler = (searchString: string) => {
    setSearchString(searchString);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitHandler={onSubmitHandler} />
        <NearestFood />
        <SearchedFood searchString={searchString} />
      </div>
    </>
  );
}
export default App;
