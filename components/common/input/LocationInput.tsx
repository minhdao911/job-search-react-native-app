import { COLORS, FONT, SIZES } from "@/constants";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { useState } from "react";
import { getLocationByLatLon } from "@/utils/location";

interface LocationInputProps {
  value: string;
  validate?: boolean;
  error?: string;
  setInput: (value: string) => void;
}

const LocationInput = ({ value, error, setInput }: LocationInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = async () => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      const errorMessage = "Permission to access location was denied";
      Alert.alert("Cannot get location", errorMessage);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const data = await getLocationByLatLon(
      location.coords.latitude,
      location.coords.longitude
    );
    setInput(data);
    setIsLoading(false);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          !!error && {
            borderColor: COLORS.red,
          },
        ]}
      >
        <Ionicons name="location-outline" size={18} color={COLORS.primary} />
        <TextInput
          style={styles.input}
          value={value}
          placeholder="Country or City, Country"
          onChangeText={setInput}
          editable={!isLoading}
        />
        <MaterialIcons
          style={styles.locationIcon}
          name="my-location"
          size={18}
          color={COLORS.primary}
          onPress={handleGetLocation}
          disabled={isLoading}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    marginRight: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingLeft: 10,
    paddingRight: 40,
  },
  input: {
    flexGrow: 1,
    fontFamily: FONT.regular,
    height: "100%",
    paddingHorizontal: SIZES.medium,
    backgroundColor: "transparent",
  },
  locationIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.red,
    marginTop: 5,
  },
});
