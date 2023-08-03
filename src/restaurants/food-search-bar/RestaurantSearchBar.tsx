/* Food search bar is in charge of getting user search query. */

import { useState, FormEvent } from "react";
import styles from "./RestaurantSearchBar.module.css";
import { updateCookie } from "../../cookies/cookie";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

const FoodSearchBar = ({ onSubmitSearch }: Props) => {
  const [searchText, setSearchText] = useState<string>(
    " Search for a restaurant"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleInputClick = () => {
    if (searchText === " Search for a restaurant") {
      setSearchText("");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateCookie(searchText);
    onSubmitSearch(searchText);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchText}
            className={`form-control ${styles.searchBar}`}
            id="searchInput"
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default FoodSearchBar;
