import React, {useRef, FormEvent} from "react";
import styles from "./FoodSearchBar.module.css";

interface Props {
  onSubmitHandler: (searchString: string) => void;
}

const FoodSearchBar = ({onSubmitHandler}: Props) => {
  const searchStringRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchStringRef.current) {
      onSubmitHandler(searchStringRef.current.value);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
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