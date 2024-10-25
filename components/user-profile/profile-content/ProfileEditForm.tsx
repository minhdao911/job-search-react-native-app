import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import LocationInput from "@/components/common/input/LocationInput";
import { Input } from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import Feather from "@expo/vector-icons/Feather";

import styles from "./profilecontent.style";
import { getLocationByText } from "@/utils/location";
import { useAuth } from "@/providers/AuthProvider";
import { Table, User } from "@/lib/db/schema";
import { writeData } from "@/lib/db";
import { COLORS } from "@/constants";

interface ProfileEditFormProps {
  onSavePress: () => void;
}

const ProfileEditForm = ({ onSavePress }: ProfileEditFormProps) => {
  const { user, setUser } = useAuth();
  const { email, preferences, location } = user!;
  const titles = preferences?.split(",") ?? [];

  const [locationInput, setLocationInput] = useState(location ?? "");
  const [locationError, setLocationError] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [jobTitles, setJobTitles] = useState(titles);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const handleTitlePress = (item: string) => {
    const newItems = jobTitles.slice();
    const index = jobTitles.indexOf(item);
    if (index > -1) {
      newItems.splice(index, 1);
    } else if (jobTitles.length < 3) {
      newItems.push(item);
    }
    setJobTitles(newItems);
  };

  const handleTitleAdd = () => {
    if (titleInput) {
      setJobTitles([...jobTitles, titleInput]);
      setTitleInput("");
    }
  };

  const validateLocation = async (text: string) => {
    if (!text) {
      return;
    }
    const locationParts = text.split(",");
    const location = await getLocationByText({
      city: locationParts[1] ? locationParts[0].trim() : undefined,
      country: locationParts[0].trim(),
    });
    if (!location) {
      setLocationError("Location not found");
    } else {
      setLocationError("");
    }
    return location;
  };

  const handleSave = async () => {
    setIsSaveLoading(true);
    const location = await validateLocation(locationInput);
    if (!location) {
      setIsSaveLoading(false);
      return;
    }
    const updatedData = {
      ...user,
      preferences: jobTitles.join(","),
      location,
      favorites: undefined,
    } as User;
    await writeData(Table.Users, user!.uid, updatedData);
    setUser({ ...updatedData, favorites: user!.favorites });
    setIsSaveLoading(false);
    onSavePress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Information</Text>
        <View style={styles.headerBtnContainer}>
          <Button variant="ghost" text="Save" onPress={handleSave} />
          <Text style={{ color: COLORS.gray }}>|</Text>
          <Button variant="ghost" text="Cancel" onPress={onSavePress} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FormItem label="Email">
          <Text>{email}</Text>
        </FormItem>
        <FormItem label="Preferred Location">
          <LocationInput
            value={locationInput}
            error={locationError}
            setInput={setLocationInput}
          />
        </FormItem>
        <FormItem label="Preferred Job Titles">
          <View>
            <View style={styles.titleInputContainer}>
              <Input
                containerStyle={styles.titleInput}
                value={titleInput}
                onChangeText={setTitleInput}
              />
              <Button
                style={styles.titleInputBtn}
                text="Add"
                onPress={handleTitleAdd}
              />
            </View>
            <View style={styles.preferenceContainer}>
              {jobTitles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.preferenceItem}
                  onPress={handleTitlePress.bind(this, item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                  <Feather name="x" size={16} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </FormItem>
      </View>
    </View>
  );
};

export default ProfileEditForm;

const FormItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.formItemContainer}>
      <Text style={styles.formItemTitle}>{label}</Text>
      {children}
    </View>
  );
};
