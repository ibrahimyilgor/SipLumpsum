// LanguageSelection.js

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const languages = [
  { code: "en", name: "English" },
  { code: "tr-TR", name: "Türkçe" },
  // Add more languages as needed
];

const LanguageSelection = ({ selectedLanguage, onSelectLanguage }) => {
  const { t } = useTranslation();

  const [showLanguages, setShowLanguages] = useState(false);

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        item.code === selectedLanguage
          ? styles.selectedLanguage
          : styles.unselectedLanguage,
      ]}
      onPress={() => {
        onSelectLanguage(item.code);
        toggleLanguages();
      }}
    >
      <Text
        style={
          item.code === selectedLanguage
            ? styles.selectedLanguageText
            : styles.unselectedLanguageText
        }
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("languages.language")}: </Text>
        <Text style={styles.headerText} onPress={toggleLanguages}>
          {" "}
          {languages.find((lang) => lang.code === selectedLanguage)?.name}
        </Text>
        {showLanguages && (
          <View style={styles.languagesList}>
            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    width: "50%",
    color: "#ccc",
  },
  arrow: {
    fontSize: 18,
    marginLeft: 8,
  },
  languagesList: {
    position: "absolute",
    top: 30,
    right: 10,
    width: "50%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    maxHeight: 150,
    zIndex: 1,
  },
  languageItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedLanguage: {
    backgroundColor: "#444",
    color: "#ddd",
  },
  unselectedLanguage: {
    backgroundColor: "#333",
    textColor: "#fff",
  },
  selectedLanguageText: {
    backgroundColor: "#444",
    color: "#ddd",
  },
  unselectedLanguageText: {
    backgroundColor: "#333",
    color: "#fff",
  },
});

export default LanguageSelection;
