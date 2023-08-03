import { Restaurant } from "../../custom-ds/custom";
import styles from "../styles/RestaurantsDisplay.module.css";

interface Props {
  restaurants: Restaurant[];
  headerMessage: string;
  onClickClose: () => void;
}

const apiKey = "AIzaSyBhWuoawqOBQJxIP86bdnc7_ChEAB5i9fw";
const key = process.env.REACT_APP_KEY || apiKey;

console.log(apiKey);
console.log(key);

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
                src={"/locationSymbol.png"}
              />
              {restaurant.vicinity}
            </h3>
          </div>
          <img
            className={styles.photoContainer}
            src={
              restaurant.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${restaurant.photos[0].photo_reference}
            &key=${key}`
                : "/imagePlaceHolder.png"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantsDisplay;

/*

            <div className={styles.photo}>
              {restaurant.photos ? (
                <img
                  className={styles.restaurantImage}
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${restaurant.photos[0].photo_reference}
                &key=AIzaSyByYmhlaUy0wx7xIb8J50vNAER2MPF8jns`}
*/
