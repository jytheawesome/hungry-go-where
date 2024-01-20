/* Restaurants search bar is in charge of getting user search query. */

import { useState, FormEvent } from "react";
import { updateCookie } from "../../cookies/cookie";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

const RestaurantsSearchBar = ({ onSubmitSearch }: Props) => {
  const [searchText, setSearchText] = useState<string>(
    "Search for a restaurant"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleInputClick = () => {
    if (searchText === " Search for a restaurant") {
      setSearchText("");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateCookie(searchText);
    onSubmitSearch(searchText);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder={searchText}
            className="text-2xl w-[600px] h-10 rounded-md border-2 border-black mr-1 pl-2"
            id="searchInput"
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
          <button
            type="submit"
            className="h-10 w-15 rounded-md border-2 border-black"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default RestaurantsSearchBar;
