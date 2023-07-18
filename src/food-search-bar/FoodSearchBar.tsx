import {useRef, FormEvent} from "react";
import styles from "./FoodSearchBar.module.css";

interface Props {
  onSubmitSearch: (searchString: string) => void;
}

function setCookie(name: string, value: string, daysToExpire: number): void {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
  console.log("Set cookie successfully!");
}

function getExistingQueries(): string[] | null {
  const cookieValue = getCookie("searchQueries");
  return cookieValue ? JSON.parse(cookieValue) : null;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

const FoodSearchBar = ({onSubmitSearch}: Props) => {
  const searchStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchStringRef.current) {
      const existingQueries = getExistingQueries() || [];
      existingQueries.push(searchStringRef.current.value);

      setCookie("searchQueries", JSON.stringify(existingQueries), 30);
      onSubmitSearch(searchStringRef.current.value);
    }
  };
  return (
    <>
      <p> {getCookie("searchQueries")}</p>
      <h3> Search for your favourite restaurants here. Eg. Western </h3>
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <div className="mb-3">
          <input
            ref={searchStringRef}
            type="text"
            className={"form-control"}
            id="searchInput"
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
