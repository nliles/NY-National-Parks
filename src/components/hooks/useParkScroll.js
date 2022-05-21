import { useState, useRef, useEffect } from 'react'
import { API_KEY, NPS_API } from "../../constants";

function useParkScroll(pageNumber, isFetching) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [parks, setParks] = useState([])
  const initialPageLoaded = useRef(false);
  const [hasMore, setHasMore] = useState(true);

	const start = 10 * (pageNumber - 1);

  const loadParks = async () => {
    setLoading(true)
    try {
      const url = `${NPS_API}/parks?limit=10&start=${start}&fields=images&sort=fullName&api_key=${API_KEY}`;
      const response = await fetch(url)
      const data = await response.json()
      setHasMore(data.total > pageNumber); /* 4 */
      setParks(prevItems => [...prevItems, ...data.data]);
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
     if (initialPageLoaded.current) {
       return;
     }

     loadParks(); /* 5 */
     initialPageLoaded.current = true;
   }, [loadParks])

	return {
		loading,
    error,
    parks
	}
}

export default useParkScroll
