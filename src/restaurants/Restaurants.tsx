import { useState } from "react";
import RestaurantsSearchBar from "./restaurants-logic/RestaurantSearchBar";
import NearestRestaurants from "./restaurants-logic/NearestRestaurants";
import SuggestedRestaurants from "./restaurants-logic/SuggestedRestaurants";
import SearchedRestaurants from "./restaurants-logic/SearchedRestaurants";
import MenuButtons from "./restaurants-display/MenuButtons";

interface Props {
  userLocation: { latitude: number; longitude: number };
}

const Restaurants = ({ userLocation }: Props) => {
  const [searchString, setSearchString] = useState("");
  const [seeNearestRestaurants, toggleSeeNearestRestaurants] = useState(false);
  const [seeSuggestedRestaurants, toggleSeeSuggestedRestaurants] =
    useState(false);
  const [seeSearchedRestaurants, toggleSeeSearchedRestaurants] =
    useState(false);

  const restaurantDisplaySelector = (selector: string) => {
    toggleSeeNearestRestaurants(false);
    toggleSeeSearchedRestaurants(false);
    toggleSeeSuggestedRestaurants(false);

    if (selector == "Nearest") {
      toggleSeeNearestRestaurants(true);
    } else if (selector == "Searched") {
      toggleSeeSearchedRestaurants(true);
    } else if (selector == "Suggested") {
      toggleSeeSuggestedRestaurants(true);
    }
  };

  // handler for submitting search keywords
  const onSubmitSearch = (searchString: string) => {
    setSearchString(searchString);
    restaurantDisplaySelector("Searched");
  };

  return (
    <>
      <RestaurantsSearchBar onSubmitSearch={onSubmitSearch} />
      <MenuButtons
        seeNearestRestaurants={seeNearestRestaurants}
        seeSuggestedRestaurants={seeSuggestedRestaurants}
        restaurantDisplaySelector={restaurantDisplaySelector}
      />
      <div>
        {seeNearestRestaurants && (
          <NearestRestaurants
            userLocation={userLocation}
            onClickClose={() => restaurantDisplaySelector("Close")}
          />
        )}
        {seeSearchedRestaurants && (
          <SearchedRestaurants
            onClickClose={() => restaurantDisplaySelector("Close")}
            searchString={searchString}
            userLocation={userLocation}
          />
        )}
        {seeSuggestedRestaurants && (
          <SuggestedRestaurants
            onClickClose={() => restaurantDisplaySelector("Close")}
            location={userLocation}
          />
        )}
      </div>
    </>
  );
};

export default Restaurants;
