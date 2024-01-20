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
      <div className="flex justify-center items-center flex-row mb-4">
        {" "}
        <button
          className={`mt-4 h-8 mr-4 px-2 rounded-lg border-2 border-black ${
            seeNearestRestaurants ? "bg-blue-400" : "bg-yellow-400"
          }`}
          onClick={() => restaurantDisplaySelector("Nearest")}
        >
          See restaurants near me
        </button>
        <button
          className={`mt-4 px-2 h-8 rounded-md border-2 border-black ${
            seeSuggestedRestaurants ? "bg-blue-400" : "bg-yellow-400"
          }`}
          onClick={() => restaurantDisplaySelector("Suggested")}
        >
          See restaurants based on my past searches
        </button>
      </div>
    </>
  );
};

export default MenuButtons;
