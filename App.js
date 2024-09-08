import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Calculator from "./pages/Calculator";
import SavedInvestments from "./pages/SavedInvestments";
import Settings from "./pages/Settings";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import { ThemeContextProvider } from "./theme/ThemeContext";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  const { t } = useTranslation();

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
