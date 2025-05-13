import { useEffect, useState, useCallback } from "react";

export const useFetch = (initialUrl, initialOptions = {}, autoFetch = true) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (customUrl = url, customOptions = options) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(customUrl, customOptions);
        if (!response.ok) throw new Error("Error en la petición");
        const json = await response.json();
        setData(json);
        return json;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  const refetch = (newUrl = url, newOptions = options) => {
    setUrl(newUrl);
    setOptions(newOptions);
  };

  return { data, loading, error, fetchData, refetch };
};
