import styles from "../styles/MenuButtons.module.css";

interface Props {
  seeNearestRestaurants: boolean;
  seeSuggestedRestaurants: boolean;
  restaurantDisplaySelector: (selector: string) => void;
}

const MenuButtons = ({
  seeNearestRestaurants,
  seeSuggestedRestaurants,
  restaurantDisplaySelector,
}: Props) => {
  return (
    <>
      <div className={styles.buttonsContainer}>
        {" "}
        <button
          className={
            seeNearestRestaurants
              ? styles.buttonHighlight
              : styles.buttonDefault
          }
          onClick={() => restaurantDisplaySelector("Nearest")}
        >
          See restaurants near me
        </button>
        <button
          className={
            seeSuggestedRestaurants
              ? styles.buttonHighlight
              : styles.buttonDefault
          }
          onClick={() => restaurantDisplaySelector("Suggested")}
        >
          See restaurants based on my past searches
        </button>
      </div>
    </>
  );
};

export default MenuButtons;
