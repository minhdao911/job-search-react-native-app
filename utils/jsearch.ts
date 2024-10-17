import { Endpoint, JobQuery } from "@/types/jsearch";
import { RAPID_API_KEY } from "@env";

export const getOptions = (endpoint: Endpoint, query: JobQuery) => ({
  method: "GET",
  url: `https://jsearch.p.rapidapi.com/${endpoint}`,
  params: query,
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  },
});
