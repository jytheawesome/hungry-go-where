import React from "react";
import styles from "./SearchedRestaurants.module.css";

const SearchedRestaurants = () => {
  return (
    <>
      <h2>Restaurants nearest to you based on your search:</h2>
      <ul className={styles.restaurantDisplay}> </ul>
    </>
  );
};

export default SearchedRestaurants;
