import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import Button from "@/components/common/button/Button";
import {
  DatePosted,
  EmploymentType,
  JobRequirement,
  JobSearchQuery,
} from "@/types/jsearch";
import Dropdown from "@/components/common/dropdown/Dropdown";
import { COLORS } from "@/constants";
import {
  getDatPostedText,
  getEmploymentTypeText,
  getJobRequirementText,
} from "@/utils";
import Checkbox from "@/components/common/checkbox/Checkbox";
import { ScrollView } from "react-native-gesture-handler";
import LocationInput from "@/components/common/input/LocationInput";
import MultiSelect from "@/components/common/multiselect/MultiSelect";

import styles from "./filtersheet.style";

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
  location?: string;
  onSubmit: (params: Partial<JobSearchQuery>) => void;
}

const FilterSheet = forwardRef<BottomSheet, FilterSheetProps>(
  ({ location, onSubmit }, ref) => {
    const snapPoints = useMemo(() => ["75%"], []);

    const [remoteChecked, setRemoteChecked] = useState(false);
    const [jobTypes, setJobTypes] = useState<EmploymentType[]>([]);
    const [expLevels, setExpLevels] = useState<JobRequirement[]>([]);
    const [datePosted, setDatePosted] = useState<DatePosted>();
    const [locationInput, setLocationInput] = useState<string>(location ?? "");
    const [isLocationLoading, setIsLocationLoading] = useState(false);

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
              <LocationInput
                value={locationInput}
                setInput={setLocationInput}
              />
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
