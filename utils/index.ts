import { JobCategory } from "@/types/common";
import {
  DatePosted,
  EmploymentType,
  JobRequirement,
  JobSearchResponseData,
} from "@/types/jsearch";

export const getEmploymentTypeText = (type: EmploymentType) => {
  switch (type) {
    case EmploymentType.FullTime:
      return "Full time";
    case EmploymentType.PartTime:
      return "Part time";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
};

export const getJobRequirementText = (type: JobRequirement) => {
  switch (type) {
    case JobRequirement.MoreThan3YrsExp:
      return "More than 3 years";
    case JobRequirement.Under3YrsExp:
      return "Under 3 years";
    case JobRequirement.NoDegree:
      return "No degree";
    case JobRequirement.NoExp:
      return "No experience";
    default:
      return "";
  }
};

export const getDatPostedText = (type: DatePosted) => {
  switch (type) {
    case DatePosted.Threedays:
      return "Within 3 days";
    case DatePosted.Month:
      return "This month";
    case DatePosted.Week:
      return "This week";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }
};

export const getLocationText = (data: Partial<JobSearchResponseData>) => {
  const { job_city, job_country } = data;
  return `${job_city ? job_city + ", " : ""}${job_country}`;
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getJobTitles = (type: JobCategory) => {
  switch (type) {
    case JobCategory.IT:
      return [
        "Software engineer",
        "Web developer",
        "Mobile developer",
        "Data analyst",
      ];
    case JobCategory.Business:
      return ["Finance specialist", "Accountant", "Human resources specialist"];
    case JobCategory.Healthcare:
      return ["Nutritionist", "Psychologist", "Nurse practitioner"];
    case JobCategory.Arts:
      return ["Graphic designer", "Dancer", "Photographer"];
    case JobCategory.Hospitality:
      return ["Front desk receptionist", "Bartender", "Event planner", "Chef"];
    case JobCategory.Education:
      return [
        "Tutor",
        "High school teacher",
        "Librarian",
        "Elementary school teacher",
      ];
    case JobCategory.SalesAndMarketing:
      return ["Social media specialist", "Sales engineer", "Market researcher"];
    default:
      return [];
  }
};
