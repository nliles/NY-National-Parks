import { forwardRef } from "react";
import ListItem from "../ListItem";
import Search from "../../../../components/Search";
import styles from "./index.module.css";

const List = forwardRef(
  ({ query, parks, error, handleScroll, handleInputChange }, ref) => {
    const displayNoResults = query !== "" && parks.length === 0;

    return (
      <div>
        <div className={styles.image} />
        <div className={styles.listView}>
          {error && !parks.length && (
            <div className={styles.error}>{error}</div>
          )}
          {parks.length > 0 && (
            <div className={styles.listContent}>
              <Search query={query} handleInputChange={handleInputChange} />
              {displayNoResults && <span>No Results Found</span>}
              <div
                ref={ref}
                onScroll={handleScroll}
                className={styles.listContainer}
              >
                {parks.map((park) => (
                  <ListItem key={park.id} park={park} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default List;
