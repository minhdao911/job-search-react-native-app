import { ActivityIndicator, Image, Text, View } from "react-native";
import { icons } from "@/constants";
import { Input } from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import { useEffect, useState } from "react";
import { getLocationByLatLon, getLocationByText } from "@/utils/location";
import * as ExpoLocation from "expo-location";

import styles from "./location.style";

interface LocationProps {
  currentIndex: number;
  input: string;
  setInput: (value: string) => void;
  setNextDisabled: (value: boolean) => void;
}

const Location = ({
  currentIndex,
  input,
  setInput,
  setNextDisabled,
}: LocationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentIndex === 2) {
      if (input && !error) setNextDisabled(false);
      else setNextDisabled(true);
    }
  }, [input, currentIndex]);

  const handleInputChange = (text: string) => {
    setInput(text);

    // Clear the previous timeout if user is still typing
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to execute the function after the user stops typing (e.g., 1000ms)
    const timeoutId = setTimeout(async () => {
      await validateLocation(text);
    }, 1000);

    setTypingTimeout(timeoutId);
  };

  const validateLocation = async (text: string) => {
    setIsLoading(true);
    if (!text.includes(",")) {
      setError("Please make sure city and country is separated by comma");
      setNextDisabled(true);
      setIsLoading(false);
      return;
    }
    const [city, country] = text.split(",");
    const location = await getLocationByText(city.trim(), country.trim());
    if (location) {
      setError("");
      setNextDisabled(false);
    } else {
      setError("Location not found");
      setNextDisabled(true);
    }
    setIsLoading(false);
  };

  const handleGetLocation = async () => {
    setIsLoading(true);
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied");
      return;
    }

    const location = await ExpoLocation.getCurrentPositionAsync({});
    const data = await getLocationByLatLon(
      location.coords.latitude,
      location.coords.longitude
    );
    if (data) {
      setError("");
      setInput(data);
      setNextDisabled(false);
    } else {
      setError("Location not found");
      setNextDisabled(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Text style={styles.title}>Where do you want to work?</Text>
      <Image
        style={styles.image}
        source={icons.myLocation}
        resizeMode="contain"
      />
      <View>
        <Input
          containerStyle={styles.input}
          placeholder="City, Country"
          value={input}
          onChangeText={handleInputChange}
          editable={!isLoading}
        />
        {isLoading && <ActivityIndicator style={styles.loader} />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button
          variant="ghost"
          style={styles.locationBtn}
          text="Get my current location"
          onPress={handleGetLocation}
        />
      </View>
    </>
  );
};

export default Location;
