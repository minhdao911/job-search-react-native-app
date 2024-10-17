import {
  Endpoint,
  JobDetailsResponseSchema,
  JobQuery,
  JobSearchFiltersResponseSchema,
  JobSearchResponseSchema,
} from "@/types/jsearch";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "@/utils/jsearch";

const useFetch = (endpoint: Endpoint, query: JobQuery) => {
  const options = getOptions(endpoint, query);

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

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: [endpoint, query],
    queryFn: fetchData,
    staleTime: 60 * 60 * 1000,
  });

  return {
    data,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
};

export default useFetch;
