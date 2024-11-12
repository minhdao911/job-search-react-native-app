export default {
  name: "Career Dash",
  slug: "job-search-app",
  version: "1.0.0",
  expo: {
    scheme: "acme",
    web: {
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Career Dash to use your location.",
        },
      ],
      [
        "expo-secure-store",
        {
          faceIDPermission:
            "Allow Career Dash to access your Face ID biometric data.",
        },
      ],
      "@react-native-google-signin/google-signin",
    ],
    extra: {
      eas: {
        projectId: "59857ccc-2ce1-4041-b582-a533f5301cf5",
      },
    },
    android: {
      package: "com.mida999.jobsearchapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    ios: {
      bundleIdentifier: "com.mida999.jobsearchapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_INFOPLIST,
    },
  },
};
