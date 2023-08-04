import styles from "../styles/RestaurantsDisplay.module.css";

interface Props {
  displayMessage: string;
}

const NoRestaurantsFound = ({ displayMessage }: Props) => {
  return (
    <div className={styles.NoRestaurantsFoundMessage}>
      <h3> {displayMessage} </h3>
      <img src="/restaurantCartoon.png" width={300} />
    </div>
  );
};

export default NoRestaurantsFound;
