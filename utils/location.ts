import { RAPID_API_KEY } from "@env";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
  },
};

export const getLocationByLatLon = async (lat: number, lon: number) => {
  try {
    const response = await axios.request({
      ...options,
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat,
        lon,
        "accept-language": "en",
      },
    });
    const { address } = response.data;
    return address.city + ", " + address.country;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const getLocationByText = async (city: string, country: string) => {
  try {
    const response = await axios.request({
      ...options,
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward",
      params: {
        city,
        country,
        "accept-language": "en",
      },
    });
    if (response.data.length > 0) {
      return city + ", " + country;
    }
    return "";
  } catch (error) {
    console.error(error);
    return "";
  }
};
