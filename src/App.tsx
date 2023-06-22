import {useState, useEffect} from "react";
import FoodSearchBar from "./FoodSearchBar";
import UserLocation from "./UserLocation";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  //state of user input
  const [searchString, setSearchString] = useState<string>("");
  const onSubmitHandler = (searchString: string) => {
    setSearchString(searchString);
    console.log(searchString);
  };

  //testing fetch
  useEffect(() => {
    axios.get("https://twitter.com").then((res) => console.log(res));
  }, [searchString]);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}> Hungry Go Where? </h1>
        <FoodSearchBar onSubmitHandler={onSubmitHandler} />
        <UserLocation />
      </div>
    </>
  );
}
export default App;
