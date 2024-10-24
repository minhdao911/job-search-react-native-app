import {
  Endpoint,
  JobQuery,
  JobSearchFiltersResponseSchema,
  JobSearchResponseSchema,
} from "@/types/jsearch";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { getOptions } from "@/utils/jsearch";
import mockSearch from "@/data/mock-search";
import { mockData } from "@/utils/mock-helpers";

const useSearch = (endpoint: Endpoint) => {
  const fetchData = async (query: JobQuery) => {
    // const options = getOptions(endpoint, query);
    // const response = await axios.request(options);
    const response = (await mockData(mockSearch)) as any;
    switch (endpoint) {
      case Endpoint.Search: {
        const parsedData = JobSearchResponseSchema.parse(response.data);
        return parsedData.data;
      }
      case Endpoint.SearchFilters: {
        const parsedData = JobSearchFiltersResponseSchema.parse(response.data);
        return parsedData.data;
      }
      default:
        return;
    }
  };

  const { data, error, isLoading, isSuccess, mutate } = useMutation({
    mutationKey: [endpoint],
    mutationFn: (query: JobQuery) => fetchData(query),
    cacheTime: 60 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isSuccess,
    error,
    mutate,
  };
};

export default useSearch;
