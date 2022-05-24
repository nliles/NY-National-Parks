import { useState, useEffect } from "react";
import { NPS_API_KEY, NPS_BASE_URL } from "./../../constants";
import { Park } from "./../../types";

type ParkProps = {
  parkCode?: string;
  query?: string;
  searchByCode?: boolean;
};

function useParks({ parkCode, query, searchByCode = true }: ParkProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [parks, setParks] = useState<Park[]>([]);

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
  }, [parkCode, query, searchByCode, url]);

  return {
    loading,
    error,
    parks,
  };
}

export default useParks;
