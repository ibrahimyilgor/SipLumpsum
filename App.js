import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Calculator from "./pages/Calculator";
import SavedInvestments from "./pages/SavedInvestments";
import Settings from "./pages/Settings";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { ThemeContextProvider } from "./theme/ThemeContext";
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { useRef } from "react";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  const { t } = useTranslation();
  const bannerRef = useRef(null);

  InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
  return (
    <ThemeContextProvider>
      <Drawer.Navigator
        initialRouteName={t("navigation.investmentCalculator")}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#333",
          },
          headerStyle: {
            backgroundColor: "#333",
          },
          drawerInactiveBackgroundColor: "#333",
          drawerActiveBackgroundColor: "#ccc",
          drawerActiveTintColor: "#333",
          drawerInactiveTintColor: "#ccc",
          headerTintColor: "#ccc",
        }}
      >
        <Drawer.Screen
          name={t("navigation.investmentCalculator")}
          component={Calculator}
        />
        <Drawer.Screen
          name={t("navigation.savedInvestments")}
          component={SavedInvestments}
        />
        <Drawer.Screen name={t("navigation.settings")} component={Settings} />

        {/* Add more screens as needed */}
      </Drawer.Navigator>
      <BannerAd
        ref={bannerRef}
        unitId={"ca-app-pub-4943937138677405/1530942898"}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </ThemeContextProvider>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </I18nextProvider>
  );
}
