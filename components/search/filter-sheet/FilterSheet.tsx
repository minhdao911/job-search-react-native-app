import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import Button from "@/components/common/button/Button";
import {
  DatePosted,
  EmploymentType,
  JobRequirement,
  JobSearchQuery,
} from "@/types/jsearch";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dropdown from "@/components/common/dropdown/Dropdown";
import { COLORS } from "@/constants";
import {
  getDatPostedText,
  getEmploymentTypeText,
  getJobRequirementText,
} from "@/utils";
import * as Location from "expo-location";

import styles from "./filtersheet.style";
import MultiSelect from "@/components/common/multiselect/MultiSelect";
import { getLocationByLatLon } from "@/utils/location";
import Checkbox from "@/components/common/checkbox/Checkbox";
import { ScrollView } from "react-native-gesture-handler";

const employmentTypes = Object.values(EmploymentType).map((value) => ({
  name: getEmploymentTypeText(value),
  value,
}));

const jobRequirements = Object.values(JobRequirement).map((value) => ({
  name: getJobRequirementText(value),
  value,
}));

const timeRanges = Object.values(DatePosted)
  .filter((value) => value !== DatePosted.All)
  .map((value) => ({
    name: getDatPostedText(value),
    value,
  }));

interface FilterSheetProps {
  onSubmit: (params: Partial<JobSearchQuery>) => void;
}

const FilterSheet = forwardRef<BottomSheet, FilterSheetProps>(
  ({ onSubmit }, ref) => {
    const snapPoints = useMemo(() => ["75%"], []);

    const [remoteChecked, setRemoteChecked] = useState(false);
    const [jobTypes, setJobTypes] = useState<EmploymentType[]>([]);
    const [expLevels, setExpLevels] = useState<JobRequirement[]>([]);
    const [datePosted, setDatePosted] = useState<DatePosted>();
    const [locationInput, setLocationInput] = useState<string>();
    const [locationError, setLocationError] = useState<string>();
    const [isLocationLoading, setIsLocationLoading] = useState(false);

    useEffect(() => {
      if (locationError) {
        Alert.alert("Cannot get location", locationError);
      }
    }, [locationError]);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );
    const closeSheet = () => (ref as any).current?.close();

    const handleGetLocation = async () => {
      setIsLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const data = await getLocationByLatLon(
        location.coords.latitude,
        location.coords.longitude
      );
      setLocationInput(data);
      setIsLocationLoading(false);
    };

    const handleReset = () => {
      setJobTypes([]);
      setExpLevels([]);
      setLocationInput("");
      setDatePosted(undefined);
      setRemoteChecked(false);
    };

    const handleSubmit = () => {
      const params = {
        query: locationInput,
        employment_types: jobTypes.length > 0 ? jobTypes.join(",") : undefined,
        job_requirements:
          expLevels.length > 0 ? expLevels.join(",") : undefined,
        date_posted: datePosted,
        remote_jobs_only: remoteChecked,
      };
      onSubmit(params);
      closeSheet();
    };

    return (
      <BottomSheet
        ref={ref}
        index={-1} // make it close by default
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sheetTitle}>Filters</Text>
            <Button
              variant="ghost"
              text="Reset"
              textStyle={{ color: COLORS.tertiary }}
              onPress={handleReset}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.contentWrapper}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Job Type</Text>
              <MultiSelect
                data={employmentTypes}
                placeholder="Select job type"
                selectedItems={jobTypes}
                setSelectedItems={setJobTypes}
              />
              <Checkbox
                label="Remote only"
                value={remoteChecked}
                onValueChange={setRemoteChecked}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Location</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <TextInput
                  style={styles.input}
                  value={locationInput}
                  placeholder="Anywhere"
                  onChangeText={setLocationInput}
                  editable={!isLocationLoading}
                />
                <MaterialIcons
                  style={styles.locationIcon}
                  name="my-location"
                  size={18}
                  color={COLORS.primary}
                  onPress={handleGetLocation}
                  disabled={isLocationLoading}
                />
              </View>
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Experience Level</Text>
              <MultiSelect
                data={jobRequirements}
                placeholder="Select experience level"
                selectedItems={expLevels}
                setSelectedItems={setExpLevels}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Job Post Time</Text>
              <Dropdown
                data={timeRanges}
                placeholder="Select time range"
                selectedItem={datePosted}
                setSelectedItem={setDatePosted}
                position="top"
              />
            </View>
          </ScrollView>
          <View style={styles.submitBtnContainer}>
            <Button text="Show Result" onPress={handleSubmit} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default FilterSheet;
