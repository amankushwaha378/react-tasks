import axios from "axios";
import { useEffect, useState } from "react";

function useAxios(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const response = await axios({
          url,
          ...options,
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    loading,
    error,
  };
}

export default useAxios;