import { useState, useEffect } from "react";
import { NPS_API_KEY, NPS_BASE_URL } from "./../../constants";

function useParks({ parkCode, query, searchByCode = true }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [parks, setParks] = useState([]);

  const url = searchByCode
    ? `${NPS_BASE_URL}/parks?parkCode=${parkCode}&fields=images,addresses&api_key=${NPS_API_KEY}`
    : `${NPS_BASE_URL}/parks?q=${query}&fields=images&api_key=${NPS_API_KEY}`;

  useEffect(() => {
    const fetchParks = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setParks(data.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchParks();
  }, [parkCode, query, url]);

  return {
    loading,
    error,
    parks,
  };
}

export default useParks;
