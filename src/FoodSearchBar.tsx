import React from "react";
import styles from "./FoodSearchBar.module.css";

const FoodSearchBar = () => {
  return (
    <>
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" id="searchInput" />
        </div>
        <button type="submit" className={styles.searchButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default FoodSearchBar;
