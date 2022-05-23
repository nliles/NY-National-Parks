import React from "react";
import styles from "./index.module.css";

const Search = ({ handleInputChange }) => {
  return (
    <form>
      <input
        className={styles.search}
        placeholder="Find a Park..."
        onChange={handleInputChange}
        type="search"
      />
    </form>
  );
};

export default Search;
