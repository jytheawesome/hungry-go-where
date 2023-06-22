import {useState} from "react";
import FoodSearchBar from "./FoodSearchBar";
import styles from "./App.module.css";

function App() {
  const [searchString, setSearchString] = useState("");
  const onSubmitHandler = (searchString: string) => {
    setSearchString(searchString);
    console.log(searchString);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitHandler={onSubmitHandler} />
      </div>
    </>
  );
}
export default App;
