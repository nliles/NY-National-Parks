import { useState, useEffect, useRef } from "react";
import ListItem from "../ListItem";
import Search from "../Search"
import { NPS_API, API_KEY } from "../../constants";
import styles from "./index.module.css"
// import useParkScroll from "../hooks/useParkScroll"

const ParkList = () => {
  const [filteredData, setFilteredData] = useState([])
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [parks, setParks] = useState([])
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null)

  const loadParks = async (newPageNumber) => {
     const start = 10 * (newPageNumber - 1);
    // setLoading(true)
    try {
      const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
      const response = await fetch(url)
      const data = await response.json()
      if (parks.length === data.total) {
        setHasMore(false)
      }
      setParks(prevItems => [...prevItems, ...data.data]);
      setIsFetching(false);
      // setLoading(false)
    } catch (err) {
      setError(true)
      // setLoading(false)
    }
  }

  useEffect(() => {
    loadParks(1);
  }, []);

  useEffect(() => {
    if (isFetching && hasMore) {
      const newPageNumber = pageNumber + 1
      setPageNumber(newPageNumber)
      loadParks(newPageNumber);
    }
  }, [isFetching, pageNumber, hasMore]);

  const handleScroll = () => {
    const scrolled = listRef.current.scrollHeight - listRef.current.scrollTop - listRef.current.clientHeight < 1
    if (scrolled) {
      setIsFetching(true);
    }
  }

  const handleInputChange = event => {
    const query = event.target.value;

    const stripPunctuation = (string) => (string.toLowerCase().replace(/[^\w\s]|_/g, "")
         .replace(/\s+/g, " "))

   const filteredData = parks.filter(element => {
     return stripPunctuation(element.fullName).includes(stripPunctuation(query));
   });

   setFilteredData(filteredData)
   setQuery(query)
  };

    const displayData = query !== "" ? filteredData : parks;
    const displayNoResults = query !== "" && filteredData.length === 0;

    const loader = (
      <div className={styles.loader}>
        Loading ...
      </div>
    );

    return (
      <div>
        <div className={styles.image}/>
        <div className={styles.listView}>
          {error && (
            <div className={styles.error}>{error}</div>
          )}
          {loading && (
            <div className={styles.loader}>Loading...</div>
          )}
          {parks.length > 0 && (
            <div className={styles.listContent}>
              <Search query={query} handleInputChange={handleInputChange}/>
               {displayNoResults &&
               <span>No Results Found</span>}
              <div ref={listRef} onScroll={handleScroll} className={styles.listContainer}>
                  {displayData.map(park => (
                    <ListItem key={park.id} park={park} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default ParkList;
