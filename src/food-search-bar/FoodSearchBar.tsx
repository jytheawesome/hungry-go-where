import {useRef, FormEvent} from "react";
import styles from "./FoodSearchBar.module.css";
import {getExistingQueries, setCookie} from "../cookie";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

const MAX_ITEMS = 5;

function areStringsSimilar(str1: string, str2: string): boolean {
  const words1 = str1.toLowerCase().split(" ");
  const words2 = str2.toLowerCase().split(" ");

  // Compare each word in words1 with each word in words2
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        return true;
      }
    }
  }

  return false;
}

// Function to add a string to the array, considering similarity and size constraints
function addStringToArray(existingQueries: string[], newItem: string) {
  const index = existingQueries.findIndex((query) =>
    areStringsSimilar(query, newItem)
  );

  if (index !== -1) {
    // If a similar string exists, replace it with the new item
    existingQueries[index] = newItem;
  } else {
    if (existingQueries.length === MAX_ITEMS) {
      // If the array has reached the maximum number of items, remove the first item
      existingQueries.shift();
    }
    // Add the current item to the back of the array
    existingQueries.push(newItem);
  }
}

const FoodSearchBar = ({onSubmitSearch}: Props) => {
  const searchStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchStringRef.current) {
      const existingQueries = getExistingQueries() || [];
      addStringToArray(existingQueries, searchStringRef.current.value);
      setCookie("searchQueries", JSON.stringify(existingQueries), 30);
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
