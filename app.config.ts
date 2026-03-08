import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "LN SENSI X",
  slug: "ln_sensi_x",
  version: "1.0.4",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#151718",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundColor: "#151718",
    },
    package: "com.lnsensix.app",
    versionCode: 4,
    permissions: [
      "android.permission.POST_NOTIFICATIONS",
      "android.permission.SYSTEM_ALERT_WINDOW",
      "android.permission.FOREGROUND_SERVICE",
      "android.permission.VIBRATE",
    ],
  },
  plugins: [
    "expo-router",
    [
      "expo-haptics",
      {}
    ]
  ],
  experiments: {
    typedRoutes: true,
  },
});
