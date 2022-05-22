import { useState, useEffect, useRef, useCallback } from "react";
import List from "../List";
import { NPS_API, API_KEY } from "../../../../constants";

const fetchPark = async (pageNumber) => {
  console.log('here')
  const start = 10 * (pageNumber - 1);
  const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
  const response = await fetch(url);
  const json = await response.json();
  const { data, error, total } = json;
  return { data, error, total }
}

const Container = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [parks, setParks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  let pageNumber = 0

  const loadParks = useCallback(
    async () => {
        try {
          const { data, error, total } = await fetchPark(pageNumber)
          if (parks.length === total) {
            setHasMore(false);
          }
          if (data.length) {
            setParks((prevItems) => [...prevItems, ...data]);
            setIsFetching(false);
          }
          if (error) {
            setError(error.message);
          }
        } catch (err) {
          setError("Something went wrong. Please try again.");
        }
    },
    [pageNumber, parks.length]
);

  useEffect(() => {
    loadParks();
  }, [loadParks]);

  useEffect(() => {
    if (isFetching && hasMore) {
      pageNumber++
      loadParks();
    }
  }, [isFetching, hasMore, loadParks, pageNumber]);

  const handleScroll = () => {
    const scrolled =
      listRef.current.scrollHeight -
        listRef.current.scrollTop -
        listRef.current.clientHeight <
      1;
    if (scrolled) {
      console.log('scrolled')
      setIsFetching(true);
    }
  };

  const handleInputChange = (event) => {
    const query = event.target.value;

    const stripPunctuation = (string) =>
      string
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");

    const filteredData = parks.filter((element) => {
      return stripPunctuation(element.fullName).includes(
        stripPunctuation(query)
      );
    });

    setFilteredData(filteredData);
    setQuery(query);
  };

  const displayData = query !== "" ? filteredData : parks;

  return (
    <List
      error={error}
      ref={listRef}
      parks={displayData}
      handleScroll={handleScroll}
      handleInputChange={handleInputChange}
      query={query}
    />
  );
};

export default Container;
