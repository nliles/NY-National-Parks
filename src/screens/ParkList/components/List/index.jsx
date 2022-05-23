import { forwardRef } from "react";
import ListItem from "../ListItem";
import Search from "../../../../components/Search";
import styles from "./index.module.scss";

const List = forwardRef(
  ({ query, parks, loading, error, handleScroll, handleInputChange }, ref) => {
    const displayNoResults = query && parks.length === 0;

    return (
      <div>
        <div className={styles.image} />
        <div className={styles.listView}>
          <div className={styles.listContent}>
            <Search handleInputChange={handleInputChange} />
            {!loading && displayNoResults && <span>No Results Found</span>}
            {error && !parks.length && (
              <div className={styles.error}>{error}</div>
            )}
            {!loading && parks.length > 0 && (
              <div
                ref={ref}
                onScroll={handleScroll}
                className={styles.listContainer}
              >
                {parks.map((park) => (
                  <ListItem key={park.id} park={park} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default List;
