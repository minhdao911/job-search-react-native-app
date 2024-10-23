// common
import Logo from "./common/logo/Logo";
import ScreenContainer from "./common/screen-container/ScreenContainer";
import SearchResultCard from "./common/cards/search-result/SearchResultCard";
import { Input, ControlledInput } from "./common/input/Input";
import Button from "./common/button/Button";
import GoogleSigninButton from "./common/button/GoogleSigninButton";

// onboarding screen
import ListItem from "./onboarding/list-item/ListItem";
import ActionButtons from "./onboarding/action-buttons/ActionButtons";
import JobTitles from "./onboarding/job-titles/JobTitles";
import Location from "./onboarding/location/Location";

// home screen
import Welcome from "./home/welcome/Welcome";
import NearbyJobs from "./home/nearby/NearbyJobs";
import PopularJobs from "./home/popular/PopularJobs";

// job details screen
import Company from "./jobdetails/company/Company";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";
import Reviews from "./jobdetails/reviews/Reviews";
import Highlights from "./jobdetails/highlights/Highlights";

export {
  // common
  Logo,
  ScreenContainer,
  SearchResultCard,
  Button,
  GoogleSigninButton,
  Input,
  ControlledInput,
  // onboarding
  ListItem,
  ActionButtons,
  JobTitles,
  Location,
  // home
  Welcome,
  NearbyJobs,
  PopularJobs,
  // job details
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Reviews,
  Highlights,
};
