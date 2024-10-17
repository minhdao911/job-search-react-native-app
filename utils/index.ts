import { EmploymentType } from "@/types/jsearch";

export const getEmploymentType = (type: EmploymentType) => {
  switch (type) {
    case EmploymentType.FullTime:
      return "Full time";
    case EmploymentType.PartTime:
      return "Part time";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
};
