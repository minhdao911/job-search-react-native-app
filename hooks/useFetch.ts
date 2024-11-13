import axios from "axios";
import dayjs from "dayjs";
import {
  Endpoint,
  JobDetailsResponseSchema,
  JobQuery,
  JobSearchFiltersResponseSchema,
  JobSearchResponseSchema,
} from "@/types/jsearch";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "@/utils/jsearch";
import mockSearch from "@/data/mock-search";
import mockFilters from "@/data/mock-filters";
import mockDetails from "@/data/mock-details";
import { mockData } from "@/utils/mock-helpers";
import { ENVIRONMENT } from "@env";

const useFetch = (endpoint: Endpoint, query: JobQuery) => {
  const options = getOptions(endpoint, query);

  const fetchData = async () => {
    let response;

    if (ENVIRONMENT !== "development") {
      response = await axios.request(options);
    }

    switch (endpoint) {
      case Endpoint.Search: {
        response = response ?? ((await mockData(mockSearch)) as any);
        const parsedData = JobSearchResponseSchema.parse(response.data);
        return parsedData.data.filter((item) =>
          item.job_offer_expiration_datetime_utc
            ? dayjs().diff(dayjs(item.job_offer_expiration_datetime_utc)) < 0
            : true
        );
      }
      case Endpoint.SearchFilters: {
        response = response ?? ((await mockData(mockFilters)) as any);
        const parsedData = JobSearchFiltersResponseSchema.parse(response.data);
        return parsedData.data;
      }
      case Endpoint.Details: {
        response = response ?? ((await mockData(mockDetails)) as any);
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
