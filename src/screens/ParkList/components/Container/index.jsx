import { useState, useEffect, useRef, useCallback } from "react";
import List from "../List";
import { NPS_API, API_KEY } from "../../../../constants";

const Container = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [parks, setParks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  const loadParks = useCallback(async () => {
    // console.log('here', newPageNumber)
    //const start = 10 * (newPageNumber - 1);
    const start = 1;
    // setLoading(true)
    try {
      const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
      const response = await fetch(url);
      const json = await response.json();
      const { data, error, total } = json;
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
      // setLoading(false)
    } catch (err) {
      setError("Something went wrong. Please try again.");
      // setLoading(false)
    }
  }, [parks.length]);

  // const loadParks = async newPageNumber => {
  //   console.log('here', newPageNumber)
  //   const start = 10 * (newPageNumber - 1);
  //  // setLoading(true)
  //  try {
  //    const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
  //    const response = await fetch(url)
  //    const json = await response.json()
  //    const { data, error, total } = json
  //    if (parks.length === total) {
  //      setHasMore(false)
  //    }
  //    if (data.length) {
  //      setParks(prevItems => [...prevItems, ...data]);
  //      setIsFetching(false);
  //    }
  //    if (error) {
  //      setError(error.message)
  //    }
  //    // setLoading(false)
  //  } catch (err) {
  //    setError('Something went wrong. Please try again.')
  //    // setLoading(false)
  //  }
  // }

  useEffect(() => {
    loadParks(1);
  }, [loadParks]);

  useEffect(() => {
    if (isFetching && hasMore) {
      console.log("here1", pageNumber);
      const newPageNumber = pageNumber + 1;
      console.log("fetch", newPageNumber);
      setPageNumber(newPageNumber);
      loadParks(newPageNumber);
    }
  }, [isFetching, pageNumber, hasMore, loadParks]);

  const handleScroll = () => {
    const scrolled =
      listRef.current.scrollHeight -
        listRef.current.scrollTop -
        listRef.current.clientHeight <
      1;
    if (scrolled) {
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
      loading={loading}
      parks={displayData}
      handleScroll={handleScroll}
      handleInputChange={handleInputChange}
      query={query}
    />
  );
};

export default Container;
