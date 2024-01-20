interface Props {
  displayMessage: string;
}

const NoRestaurantsFound = ({ displayMessage }: Props) => {
  return (
    <div className="p-11 rounded-2xl items-center justify-center bg-yellow-400">
      <h3> {displayMessage} </h3>
      <img src="/restaurantCartoon.png" width={300} />
    </div>
  );
};

export default NoRestaurantsFound;
