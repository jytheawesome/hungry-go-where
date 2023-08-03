import styles from "./RestaurantsDisplay.module.css";

interface Props {
  displayMessage: string;
}

const NoRestaurantsDisplay = ({ displayMessage }: Props) => {
  return (
    <div className={styles.noRestaurantsDisplay}>
      <h3> {displayMessage} </h3>
      <img src="/restaurantIcon.png" width={300} />
    </div>
  );
};

export default NoRestaurantsDisplay;
