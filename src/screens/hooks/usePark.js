import { useState, useEffect } from "react";
import { NPS_API_KEY, NPS_BASE_URL } from "./../../constants";

function useParks({ parkCode, query, searchByCode = true }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [parks, setParks] = useState([]);

  const url = searchByCode
    ? `${NPS_BASE_URL}/parks?parkCode=${parkCode}&fields=images,addresses&api_key=${NPS_API_KEY}`
    : `${NPS_BASE_URL}/parks?q=${query}&fields=images&api_key=${NPS_API_KEY}`;

  useEffect(() => {
    const fetchParks = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const { data, error } = await response.json();
        setParks(data);
        if (error) {
          setError(error.message);
        }
        setLoading(false);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    };

    if (searchByCode || query) {
      fetchParks();
    }
  }, [parkCode, query, url]);

  return {
    loading,
    error,
    parks,
  };
}

export default useParks;
