import { FormEvent, forwardRef } from "react";
import ErrorMsg from "components/ErrorMsg";
import Banner from "components/Banner"
import Search from "components/Search";
import { Park } from "types";
import ListItem from "screens/ParkList/components/ListItem";
import styles from "./index.module.scss";

type ListProps = {
  error: string;
  searchError: string;
  parks: Park[];
  handleScroll: () => void;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
  query: string;
};

const List = forwardRef<HTMLDivElement, ListProps>(
  (
    { query, parks, error, searchError, handleScroll, handleInputChange },
    ref
  ) => {
    const displayNoResults = query && parks?.length === 0;

    return (
      <div className={styles.wrapper}>
        <Banner/>
        <div className={styles.listView}>
          <div className={styles.listContent}>
            {error && <ErrorMsg msg={error} />}
            {!error && (
              <>
                <Search handleInputChange={handleInputChange} />
                {displayNoResults && <span>No Results Found</span>}
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
      </div>
    );
  }
);

export default List;
