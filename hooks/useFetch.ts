import { RAPID_API_KEY } from "@env";
import {
  Endpoint,
  JobDetailsQuery,
  JobDetailsResponseSchema,
  JobSearchFiltersQuery,
  JobSearchFiltersResponseSchema,
  JobSearchQuery,
  JobSearchResponseSchema,
} from "@/types/jsearch";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetch = (
  endpoint: Endpoint,
  query: JobSearchQuery | JobSearchFiltersQuery | JobDetailsQuery
) => {
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
    const response = await axios.request(options);
    switch (endpoint) {
      case Endpoint.Search: {
        const parsedData = JobSearchResponseSchema.parse(response.data);
        return parsedData.data;
      }
      case Endpoint.SeachFilters: {
        const parsedData = JobSearchFiltersResponseSchema.parse(response.data);
        return parsedData.data;
      }
      case Endpoint.Details: {
        const parsedData = JobDetailsResponseSchema.parse(response.data);
        return parsedData.data;
      }
      default:
        return;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [endpoint],
    queryFn: fetchData,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useFetch;
