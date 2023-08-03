import { Restaurant } from "../../custom-ds/custom";
import styles from "../styles/RestaurantsDisplay.module.css";

interface Props {
  restaurants: Restaurant[];
  headerMessage: string;
  onClickClose: () => void;
}

const RestaurantsDisplay = ({
  restaurants,
  onClickClose,
  headerMessage,
}: Props) => {
  return (
    <div className={styles.restaurantsContainer}>
      <div className={styles.headerAndCloseButtonContainer}>
        <h3 className={styles.header}>{headerMessage}</h3>
        <button onClick={onClickClose} className={styles.closeButton}>
          Close
        </button>
      </div>
      {restaurants.map((restaurant) => (
        <div className={styles.restaurantContainer}>
          <div className={styles.nameAndDescriptionContainer}>
            <h2 className={styles.nameContainer}>{restaurant.name}</h2>
            <h3 className={styles.descriptionContainer}>
              <img
                className={styles.locationIcon}
                src="/location.png"
                alt="../../public/location.png"
              />
              {restaurant.vicinity}
            </h3>
          </div>
          <img
            className={styles.photoContainer}
            src="/restaurant.jpg"
            alt="../../public/restaurant.jpg"
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantsDisplay;

/*
    <ul>
      {restaurants.map((restaurant) => (
        <li key={`${restaurant.name}-${restaurant.vicinity}`}>
          <div className={styles.photoAndDescription}>
            <div className={styles.description}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.vicinity}</p>
            </div>
            <div className={styles.photo}>
              {restaurant.photos ? (
                <img
                  className={styles.restaurantImage}
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${restaurant.photos[0].photo_reference}
                &key=AIzaSyByYmhlaUy0wx7xIb8J50vNAER2MPF8jns`}
                />
              ) : (
                "No photo available :("
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
    */
