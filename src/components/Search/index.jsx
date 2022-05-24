import React from "react";
import styles from "./index.module.scss";

const Search = ({ disabled, handleInputChange }) => {
  return (
    <form>
      <div className={styles.inputContainer}>
        <label htmlFor="parkSearch">Search for parks by name</label>
        <input
          disabled={disabled}
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
