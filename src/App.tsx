import {useState} from "react";
import FoodSearchBar from "./FoodSearchBar";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar />
      </div>
    </>
  );
}
export default App;
