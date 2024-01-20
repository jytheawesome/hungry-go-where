import { Restaurant } from "../../custom-ds/custom";
interface Props {
  restaurants: Restaurant[];
  headerMessage: string;
  onClickClose: () => void;
}

const key = process.env.REACT_APP_KEY;
console.log(process.env.REACT_APP_KEY);

const RestaurantsDisplay = ({
  restaurants,
  onClickClose,
  headerMessage,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="w-[900px] flex flex-row items-center mb-1 rounded-2xl bg-yellow-400 h-11">
        <h3 className="pl-5 w-[820px]">{headerMessage}</h3>
        <button
          onClick={onClickClose}
          className="rounded-xl px-3 ml-[-8px] border-2 border-black h-8"
        >
          Close
        </button>
      </div>
      {restaurants.map((restaurant) => (
        <div className="flex flex-row h-[300px] w-[900px] bg-yellow-400 rounded-2xl mt-1 mb-1">
          <div className="w-[700px] flex flex-col">
            <h2 className="pb-7 pl-7 pt-2.5">{restaurant.name}</h2>
            <h3 className="pb-[100px] pl-7">
              <img className="w-5 h-5 pr-1" src={"/locationSymbol.png"} />
              {restaurant.vicinity}
            </h3>
          </div>
          <img
            className="p-5 min-w-[300px] min-h-[250px] max-w-[300px] max-h-[250px]"
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
