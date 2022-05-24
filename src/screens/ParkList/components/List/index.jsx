import { forwardRef } from "react";
import ListItem from "../ListItem";
import ErrorMsg from "../../../../components/ErrorMsg";
import Search from "../../../../components/Search";
import styles from "./index.module.scss";

const List = forwardRef(
  (
    {
      query,
      parks,
      loading,
      error,
      searchError,
      handleScroll,
      handleInputChange,
    },
    ref
  ) => {
    const displayNoResults = query && parks?.length === 0;

    return (
      <div className={styles.wrapper}>
        <div className={styles.image} />
        <div className={styles.listView}>
          <div className={styles.listContent}>
            {error && <ErrorMsg msg={error} />}
            {!error && (
              <>
                <Search handleInputChange={handleInputChange} />
                {!loading && displayNoResults && <span>No Results Found</span>}
                {!loading && (
                  <div
                    ref={ref}
                    onScroll={handleScroll}
                    className={styles.listContainer}
                  >
                    {searchError && <ErrorMsg msg={searchError} />}
                    {!searchError &&
                      parks?.map((park) => (
                        <ListItem key={park.id} park={park} />
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default List;
