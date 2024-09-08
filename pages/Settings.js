import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Keyboard,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import LanguageSelection from "../components/languageSelection";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import ThemeSelection from "../components/themeSelection";

export default function Settings() {
  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Default language

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
      color: "#ccc",
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <LanguageSelection
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleLanguageChange}
      />
      <ThemeSelection />
    </View>
  );
}
