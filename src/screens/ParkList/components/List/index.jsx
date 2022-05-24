import { forwardRef } from "react";
import ListItem from "../ListItem";
import ErrorMsg from "components/ErrorMsg";
import Spinner from "components/Spinner";
import Search from "components/Search";
import styles from "./index.module.scss";

const List = forwardRef(
  (
    {
      query,
      parks,
      error,
      loading,
      searchError,
      handleScroll,
      handleInputChange,
    },
    ref
  ) => {
    const displayNoResults = query && parks?.length === 0;

    return (
      <div className={styles.wrapper}>
        {!error && loading && <Spinner />}
        {!loading && (
          <>
            <div className={styles.listView}>
              <div className={styles.listContent}>
                {error && <ErrorMsg msg={error} />}
                {!error && (
                  <>
                    <Search handleInputChange={handleInputChange} />
                    {!loading && displayNoResults && (
                      <span>No Results Found</span>
                    )}
                    <div
                      ref={ref}
                      onScroll={handleScroll}
                      className={styles.listContainer}
                    >
                      {searchError && <ErrorMsg msg={searchError} />}
                      {!searchError &&
                        parks?.map((park) => (
                          <ListItem
                            key={park.id}
                            designation={park.designation}
                            fullName={park.fullName}
                            images={park.images}
                            parkCode={park.parkCode}
                            states={park.states}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default List;
