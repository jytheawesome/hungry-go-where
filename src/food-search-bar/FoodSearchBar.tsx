import {useRef, FormEvent} from "react";
import Cookies from "js-cookie";

import styles from "./FoodSearchBar.module.css";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

// function setCookie(name: string, value: string, daysToExpire: number): void {
//   const date = new Date();
//   date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + ";" + expires + ";path=/";
//   console.log("Set cookie successfully!");
// }

const FoodSearchBar = ({onSubmitSearch}: Props) => {
  const searchStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchStringRef.current) {
      //setCookie("searchQuery", searchStringRef.current.value, 30);
      onSubmitSearch(searchStringRef.current.value);
    }
  };
  return (
    <>
      <h3> Search for your favourite restaurants here. Eg. Western </h3>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <div className="mb-3">
          <input
            ref={searchStringRef}
            type="text"
            className={"form-control"}
            id="searchInput"
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default FoodSearchBar;
