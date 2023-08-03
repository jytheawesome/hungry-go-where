import styles from "../styles/RestaurantsDisplay.module.css";

const SearchingRestaurantsIndicator = () => {
  return (
    <div className={styles.SearchingIndicator}>
      <h3> Searching for restaurants... </h3>
    </div>
  );
};

export default SearchingRestaurantsIndicator;
