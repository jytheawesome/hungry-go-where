import {useRef, FormEvent} from "react";
import styles from "./FoodSearchBar.module.css";
import {getExistingQueries, setCookie} from "../cookie";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

const FoodSearchBar = ({onSubmitSearch}: Props) => {
  const searchStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchStringRef.current) {
      const existingQueries = getExistingQueries() || [];
      existingQueries.push(searchStringRef.current.value);
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
