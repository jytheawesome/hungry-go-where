import {useState, useEffect} from "react";
import FoodSearchBar from "./FoodSearchBar";
import UserLocation from "./NearestFood";
import styles from "./App.module.css";
import axios from "axios";
import NearestFood from "./NearestFood";

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
