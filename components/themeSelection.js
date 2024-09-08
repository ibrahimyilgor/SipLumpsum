import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useThemeContext } from "../theme/ThemeContext";

const ThemeSelection = ({}) => {
  const { t } = useTranslation();
  const { theme, setTheme, themes } = useThemeContext();

  const [showThemes, setShowThemes] = useState(false);

  const toggleThemes = () => {
    setShowThemes(!showThemes);
  };

  const renderThemeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.themeItem,
        item.code === theme ? styles.theme : styles.untheme,
      ]}
      onPress={() => {
        setTheme(item);
        toggleThemes();
      }}
    >
      <Text style={item.code === theme ? styles.themeText : styles.unthemeText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("theme.theme")}: </Text>
        <Text style={styles.headerText} onPress={toggleThemes}>
          {" "}
          {themes.find((th) => th.code === theme?.code)?.name}
        </Text>
        {showThemes && (
          <View style={styles.themesList}>
            <FlatList
              data={themes}
              renderItem={renderThemeItem}
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
  themesList: {
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
  themeItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  theme: {
    backgroundColor: "#444",
    color: "#ddd",
  },
  untheme: {
    backgroundColor: "#333",
    textColor: "#fff",
  },
  themeText: {
    backgroundColor: "#444",
    color: "#ddd",
  },
  unthemeText: {
    backgroundColor: "#333",
    color: "#fff",
  },
});

export default ThemeSelection;
