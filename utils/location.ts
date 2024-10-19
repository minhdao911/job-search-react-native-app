import { RAPID_API_KEY } from "@env";
import axios from "axios";

export const getLocation = async (lat: number, lon: number) => {
  const options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
    params: {
      lat,
      lon,
      "accept-language": "en",
    },
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    const { address } = response.data;
    return address.city + ", " + address.country;
  } catch (error) {
    console.error(error);
    return "";
  }
};
