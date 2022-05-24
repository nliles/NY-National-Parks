import { useState, useEffect } from "react";
import { NPS_API_KEY, NPS_BASE_URL } from "./../../constants";
import { Park } from "./../../types";

function useParks(pageNumber: number) {
  const [error, setError] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const start = 10 * (pageNumber - 1);
        const url = `${NPS_BASE_URL}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${NPS_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        const { data, error, total } = json;
        if (total) {
          setTotal(total);
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
    };

    fetchParks();
  }, [pageNumber]);

  return {
    isFetching,
    setIsFetching,
    error,
    parks,
    total,
  };
}

export default useParks;
