import styles from "./RestaurantsDisplay.module.css";

const SearchingIndicator = () => {
  return (
    <div className={styles.SearchingIndicator}>
      <h3> Searching for restaurants... </h3>
    </div>
  );
};

export default SearchingIndicator;
