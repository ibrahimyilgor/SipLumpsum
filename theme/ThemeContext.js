import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const ThemeContext = React.createContext({});

export default ThemeContext;

export const ThemeContextProvider = ({ children }) => {
  const { t } = useTranslation();

  const themes = [
    {
      code: "light",
      name: t("theme.light"),
      values: {
        color: "#333",
        backgroundColor: "#ccc",
      },
    },
    {
      code: "dark",
      name: t("theme.dark"),
      values: {
        color: "#ccc",
        backgroundColor: "#333",
      },
    },
    // Add more themes as needed
  ];

  const [theme, setTheme] = React.useState(themes[0]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
