import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
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
import Checkbox from "expo-checkbox";
import { COLORS } from "@/constants";
import {
  getDatPostedText,
  getEmploymentTypeText,
  getJobRequirementText,
} from "@/utils";

import styles from "./filtersheet.style";
import MultiSelect from "@/components/common/multiselect/MultiSelect";

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
    const snapPoints = useMemo(() => ["70%"], []);

    const [remoteChecked, setRemoteChecked] = useState(false);
    const [jobTypes, setJobTypes] = useState<EmploymentType[]>([]);
    const [location, setLocation] = useState<string>();
    const [expLevels, setExpLevels] = useState<JobRequirement[]>([]);
    const [datePosted, setDatePosted] = useState<DatePosted>();

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

    const handleReset = () => {
      setJobTypes([]);
      setExpLevels([]);
      setLocation("");
      setDatePosted(undefined);
      setRemoteChecked(false);
    };

    const handleSubmit = () => {
      const params = {
        query: location,
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
          >
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Job Type</Text>
              <MultiSelect
                data={employmentTypes}
                placeholder="Select job type"
                selectedItems={jobTypes}
                setSelectedItems={setJobTypes}
              />
              <View style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={remoteChecked}
                  onValueChange={setRemoteChecked}
                  color={remoteChecked ? COLORS.tertiary : undefined}
                />
                <Text style={styles.checkboxText}>Remote only</Text>
              </View>
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemTitle}>Location</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <TextInput
                    style={styles.input}
                    value={location}
                    placeholder="Anywhere"
                    onChangeText={setLocation}
                  />
                </View>
                <MaterialIcons
                  name="my-location"
                  size={18}
                  color={COLORS.primary}
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
          <Button
            text="Show Result"
            style={styles.submitBtn}
            onPress={handleSubmit}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default FilterSheet;
