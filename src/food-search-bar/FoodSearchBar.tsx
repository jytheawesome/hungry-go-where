import {useState, FormEvent} from "react";
import styles from "./FoodSearchBar.module.css";
import {updateCookie} from "../cookie";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

const FoodSearchBar = ({onSubmitSearch}: Props) => {
  //const searchStringRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>(
    "Search for a restaurant"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleInputClick = () => {
    if (searchText === "Search for a restaurant") {
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
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <div className="mb-3">
          <input
            //ref={searchStringRef}
            type="text"
            value={searchText}
            className={"form-control"}
            id="searchInput"
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default FoodSearchBar;
