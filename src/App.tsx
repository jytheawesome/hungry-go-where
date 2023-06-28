import {useState, useEffect} from "react";
import FoodSearchBar from "./food-search-bar/FoodSearchBar";
import styles from "./App.module.css";
import NearestFood from "./nearest-food-display/NearestFood";

function App() {
  //state of user input
  const [searchString, setSearchString] = useState("");
  const onSubmitHandler = (searchString: string) => {
    setSearchString(searchString);
    console.log(searchString);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitHandler={onSubmitHandler} />
        <NearestFood />
      </div>
    </>
  );
}
export default App;
