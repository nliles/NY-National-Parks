import { FormEvent } from "react";
import styles from "./index.module.scss";

type SearchProps = {
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
};

const Search = ({ handleInputChange }: SearchProps) => {
  return (
    <form>
      <div className={styles.inputContainer}>
        <label htmlFor="parkSearch">Search for parks by name</label>
        <input
          name="parkSearch"
          id="parkSearch"
          className={styles.search}
          placeholder="Enter a park name"
          onChange={handleInputChange}
          type="search"
        />
      </div>
    </form>
  );
};

export default Search;
