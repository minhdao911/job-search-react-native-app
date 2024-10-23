export default {
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
            "Allow CareerDash to use your location.",
        },
      ],
      [
        "expo-secure-store",
        {
          faceIDPermission:
            "Allow CareerDash to access your Face ID biometric data.",
        },
      ],
      "@react-native-google-signin/google-signin",
    ],
    name: "job-search-app",
    slug: "job-search-app",
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
