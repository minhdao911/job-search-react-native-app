import { z } from "zod";

export enum Endpoint {
  Search = "search",
  SeachFilters = "search-filters",
  Details = "job-details",
}

export enum EmploymentType {
  FullTime = "FULLTIME",
  PartTime = "PARTTIME",
  Contractor = "CONTRACTOR",
  Intern = "INTERN",
  Temporary = "TEMPORARY",
}

export enum DatePosted {
  All = "all",
  Today = "today",
  Threedays = "3days",
  Week = "week",
  Month = "month",
}

export enum JobRequirement {
  Under3YrsExp = "under_3_years_experience",
  MoreThan3YrsExp = "more_than_3_years_experience",
  NoExp = "no_experience",
  NoDegree = "no_degree",
}

export enum SalaryPeriod {
  Hour = "HOUR",
  Month = "MONTH",
  Year = "YEAR",
}

const CommonJobSearchQuerySchema = z.object({
  query: z.string(),
  date_posted: z.nativeEnum(DatePosted).optional(),
  remote_jobs_only: z.boolean().optional(),
  employment_types: z.string().optional(),
  job_requirements: z.string().optional(),
  job_titles: z.string().optional(), // id from search filter
  company_types: z.string().optional(), // id from search filter
  employers: z.string().optional(), // id from search filter
  radius: z.number().optional(), // in km
  actively_hiring: z.string().optional(),
});

const CommonJobDetailsQuerySchema = z.object({
  fields: z.string().optional(),
  markup_job_description: z.boolean().optional(),
});

const JobSearchQuerySchema = CommonJobSearchQuerySchema.merge(
  CommonJobDetailsQuerySchema
).extend({
  page: z.number().optional(),
  num_pages: z.number().optional(),
  exclude_job_publishers: z.boolean().optional(),
});
export type JobSearchQuery = z.infer<typeof JobSearchQuerySchema>;

const JobSearchFiltersQuerySchema = CommonJobSearchQuerySchema;
export type JobSearchFiltersQuery = z.infer<typeof JobSearchFiltersQuerySchema>;

const JobDetailsQuerySchema = CommonJobDetailsQuerySchema.extend({
  job_id: z.string(),
  extended_publisher_details: z.boolean().optional(),
});
export type JobDetailsQuery = z.infer<typeof JobDetailsQuerySchema>;

export type JobQuery = JobSearchQuery | JobSearchFiltersQuery | JobDetailsQuery;

const JobRequiredExperienceSchema = z.object({
  no_experience_required: z.coerce.boolean(),
  required_experience_in_months: z.coerce.number(),
  experience_mentioned: z.coerce.boolean(),
  experience_preferred: z.coerce.boolean(),
});

const JobRequiredEducationSchema = z.object({
  postgraduate_degree: z.coerce.boolean(),
  professional_certification: z.coerce.boolean(),
  high_school: z.coerce.boolean(),
  associates_degree: z.coerce.boolean(),
  bachelors_degree: z.coerce.boolean(),
  degree_mentioned: z.coerce.boolean(),
  degree_preferred: z.coerce.boolean(),
  professional_certification_mentioned: z.coerce.boolean(),
});

const JobHighlightsSchema = z.object({
  Qualifications: z.array(z.string()).nullish(),
  Responsibilities: z.array(z.string()).nullish(),
  Benefits: z.array(z.string()).nullish(),
});
export type JobHighlights = z.infer<typeof JobHighlightsSchema>;

const JobApplyOptionSchema = z.object({
  publisher: z.string(),
  apply_link: z.string(),
  is_direct: z.boolean(),
});

const JobEstimatedSalarySchema = z.object({
  location: z.string().nullish(),
  job_title: z.string().nullish(),
  publisher_name: z.string().nullish(),
  publisher_link: z.string().nullish(),
  min_salary: z.number().nullish(),
  max_salary: z.number().nullish(),
  median_salary: z.number().nullish(),
  salary_period: z.nativeEnum(SalaryPeriod).nullish(),
  salary_currency: z.string().nullish(),
});

const JobEmployerReviewSchema = z.object({
  publisher: z.string(),
  employer_name: z.string(),
  score: z.number(),
  num_stars: z.number(),
  review_count: z.number(),
  max_score: z.number(),
  reviews_link: z.string(),
});
export type JobEmployerReview = z.infer<typeof JobEmployerReviewSchema>;

const JobFilterPropsSchema = z.object({
  name: z.string(),
  value: z.string(),
  est_count: z.number(),
});

const JobSearchResponseDataSchema = z.object({
  job_id: z.string(),
  employer_name: z.string(),
  employer_logo: z.string().nullish(),
  employer_website: z.string().nullish(),
  employer_company_type: z.string().nullish(),
  employer_linkedin: z.string().nullish(),
  job_employment_type: z.nativeEnum(EmploymentType),
  job_title: z.string(),
  job_publisher: z.string(),
  job_apply_link: z.string(),
  job_apply_is_direct: z.boolean(),
  job_apply_quality_score: z.number(),
  job_description: z.string(),
  job_is_remote: z.boolean(),
  job_posted_at_timestamp: z.number(),
  job_posted_at_datetime_utc: z.string(),
  job_city: z.string().nullish(),
  job_state: z.string().nullish(),
  job_country: z.string(),
  job_latitude: z.number(),
  job_longitude: z.number(),
  job_google_link: z.string(),
  job_offer_expiration_datetime_utc: z.string().nullish(),
  job_offer_expiration_timestamp: z.number().nullish(),
  job_required_experience: JobRequiredExperienceSchema.optional(),
  job_required_skills: z.array(z.string()).nullish(),
  job_required_education: JobRequiredEducationSchema.optional(),
  job_min_salary: z.number().nullish(),
  job_max_salary: z.number().nullish(),
  job_salary_currency: z.string().nullish(),
  job_salary_period: z.nativeEnum(SalaryPeriod).nullish(),
  job_highlights: JobHighlightsSchema.optional(),
  job_job_title: z.string().nullish(),
  job_posting_language: z.string(),
});
export type JobSearchResponseData = z.infer<typeof JobSearchResponseDataSchema>;

const JobSearchFiltersResponseDataSchema = z.object({
  categories: z.array(JobFilterPropsSchema),
  job_titles: z.array(JobFilterPropsSchema),
  company_types: z.array(JobFilterPropsSchema),
  employers: z.array(JobFilterPropsSchema),
  date_posted: z.array(JobFilterPropsSchema),
  employment_types: z.array(JobFilterPropsSchema),
  job_requirements: z.array(JobFilterPropsSchema),
});
export type JobSearchFiltersResponseData = z.infer<
  typeof JobSearchFiltersResponseDataSchema
>;

const JobDetailsResponseDataSchema = JobSearchResponseDataSchema.extend({
  estimated_salaries: z.array(JobEstimatedSalarySchema),
  apply_options: z.array(JobApplyOptionSchema),
  employer_reviews: z.array(JobEmployerReviewSchema),
});
export type JobDetailsResponseData = z.infer<
  typeof JobDetailsResponseDataSchema
>;

export const JobSearchResponseSchema = z.object({
  status: z.string(),
  data: z.array(JobSearchResponseDataSchema),
});
export type JobSearchResponse = z.infer<typeof JobSearchResponseSchema>;

export const JobSearchFiltersResponseSchema = z.object({
  status: z.string(),
  data: JobSearchFiltersResponseDataSchema,
});
export type JobSearchFiltersResponse = z.infer<
  typeof JobSearchFiltersResponseSchema
>;

export const JobDetailsResponseSchema = z.object({
  status: z.string(),
  data: z.array(JobDetailsResponseDataSchema),
});
export type JobDetailsResponse = z.infer<typeof JobDetailsResponseSchema>;
