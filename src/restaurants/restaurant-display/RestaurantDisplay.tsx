import { Restaurant } from "../../custom-ds/custom";
import styles from "./RestaurantDisplay.module.css";

/*
const dummyRestaurants: dummyRestaurant[] = [
  {
    name: "Hokkien Mee",
    vicinity:
      "Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil Jalan Jurong Kechil",
    photo: "../restaurant.jpg",
  },
  {
    name: "Chicken Rice",
    vicinity: "Choa Chu Kang Street 21",
    photo: "../restaurant.jpg",
  },
  {
    name: "Buddies and Hoagies",
    vicinity: "Beauty World",
    photo: "../restaurant.jpg",
  },
  {
    name: "Beauty in a pot",
    vicinity: "Jewel Changi Airport",
    photo: "../restaurant.jpg",
  },
];
*/

interface Props {
  restaurants: Restaurant[];
  headerMessage: string;
  onClickClose: () => void;
}

const RestaurantDisplay = ({
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

export default RestaurantDisplay;

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
