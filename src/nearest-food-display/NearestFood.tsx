// import { useState, useEffect } from "react";
// import axios from "axios";
import styles from "../restaurant-display-styles/RestaurantDisplay.module.css";
import { dummyRestaurant } from "../custom";
// import { Restaurant, dummyRestaurant } from "../custom";

interface Props {
  userLocation: { latitude: number; longitude: number };
  onClickClose: () => void;
}

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

const NearestFood = ({ userLocation, onClickClose }: Props) => {
  // Declarations
  console.log("Coordinates for nearest restaurants: " + userLocation);
  /*
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  //const apiKey = process.env.maps_api;
  const apiKey = "AIzaSyByYmhlaUy0wx7xIb8J50vNAER2MPF8jns";

  // Function to fetch nearest restaurants from backend server
  const fetchNearbyRestaurants = async (
    latitude: number,
    longitude: number
  ): Promise<any[]> => {
    const url = `https://hungry-go-where-api.vercel.app/api/nearby-restaurants?latitude=${latitude}&longitude=${longitude}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      console.log(
        `Successfully found nearest restaurants. Total: ${results.length}. Coords: ${latitude}, ${longitude}`
      );
      return results;
    } catch (error) {
      console.error("Error finding nearest restaurants:", error);
      return [];
    }
  };

  // fetchNearbyRestaurants(userLocation.latitude, userLocation.longitude)
  //   .then((data) => {
  //     setRestaurants(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error finding nearest restaurants:", error);
  //   });

  //Fetch nearby restaurants.

  useEffect(() => {
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;
    if (latitude == 0 || longitude == 0) return;
    fetchNearbyRestaurants(latitude, longitude)
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error finding nearest restaurants:", error);
      });
  }, [userLocation]);
  */

  return (
    <>
      <div className={styles.restaurantsContainer}>
        <div className={styles.headerAndCloseButtonContainer}>
          <h3 className={styles.header}>
            Restaurants that are closest to you:
          </h3>
          <button onClick={onClickClose} className={styles.closeButton}>
            Close
          </button>
        </div>
        {dummyRestaurants.map((restaurant) => (
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

        {/*
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
        */}
      </div>
    </>
  );
};

export default NearestFood;
