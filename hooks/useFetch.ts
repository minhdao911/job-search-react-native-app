import { useEffect, useState } from "react";
import { RAPID_API_KEY } from "@env";
import {
  Endpoint,
  JobDetailsQuery,
  JobDetailsResponseData,
  JobDetailsResponseSchema,
  JobSearchFiltersQuery,
  JobSearchFiltersResponseData,
  JobSearchFiltersResponseSchema,
  JobSearchQuery,
  JobSearchResponseData,
  JobSearchResponseSchema,
} from "@/types/jsearch";
import axios from "axios";

const useFetch = (
  endpoint: Endpoint,
  query: JobSearchQuery | JobSearchFiltersQuery | JobDetailsQuery
) => {
  const [data, setData] = useState<
    JobSearchResponseData[] | JobDetailsResponseData[]
  >([]);
  const [filters, setFilters] = useState<JobSearchFiltersResponseData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: query,
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      switch (endpoint) {
        case Endpoint.Search: {
          const parsedData = JobSearchResponseSchema.parse(response.data);
          setData(parsedData.data);
          break;
        }
        case Endpoint.SeachFilters: {
          const parsedData = JobSearchFiltersResponseSchema.parse(
            response.data
          );
          setFilters(parsedData.data);
          break;
        }
        case Endpoint.Details: {
          const parsedData = JobDetailsResponseSchema.parse(response.data);
          setData(parsedData.data);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  return {
    data,
    filters,
    isLoading,
    error,
    refetch,
  };
};

export default useFetch;
