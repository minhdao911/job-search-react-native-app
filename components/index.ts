// common
import Logo from "./common/logo/Logo";
import ScreenContainer from "./common/screen-container/ScreenContainer";
import SearchResultCard from "./common/cards/search-result/SearchResultCard";
import { Input, ControlledInput } from "./common/input/Input";
import Button from "./common/button/Button";
import GoogleSigninButton from "./common/button/GoogleSigninButton";
import AnimatedFlatList from "./common/animated-flatlist/AnimatedFlatList";
import AppHeader from "./common/app-header/AppHeader";

// onboarding screen
import ActionButtons from "./onboarding/action-buttons/ActionButtons";
import JobTitles from "./onboarding/job-titles/JobTitles";
import Location from "./onboarding/location/Location";
import Preferences from "./onboarding/preferences/Preferences";

// home screen
import Welcome from "./home/welcome/Welcome";
import RecentJobs from "./home/recent/RecentJobs";
import TopCompany from "./home/top-company/TopCompany";

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
  AnimatedFlatList,
  AppHeader,
  // onboarding
  ActionButtons,
  JobTitles,
  Location,
  Preferences,
  // home
  Welcome,
  RecentJobs,
  TopCompany,
  // job details
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Reviews,
  Highlights,
};
