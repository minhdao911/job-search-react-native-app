import { EmploymentType, JobSearchResponseData } from "@/types/jsearch";

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

export const getLocation = (data: Partial<JobSearchResponseData>) => {
  const { job_city, job_country } = data;
  return `${job_city ? job_city + ", " : ""}${job_country}`;
};
