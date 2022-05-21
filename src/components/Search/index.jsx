import React from "react";
import styles from "./index.module.css"

const Search = ({ query, handleInputChange }) => {
  return (
    <form>
      <input
        className={styles.search}
        placeholder="Find a Park..."
        value={query}
        onChange={handleInputChange}
      />
    </form>
  )
}

export default Search;
