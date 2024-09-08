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
import SavedInvestmentCard from "../components/savedInvestmentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function SavedInvestments() {
  const [data, setData] = React.useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() {
      try {
        if (isFocused) {
          const value = await AsyncStorage.getItem("investments");
          console.log("ibrahim5", value);
          if (JSON.parse(value) !== null) {
            // Parse the string back into an array
            setData(JSON.parse(value));
          } else {
            // setData([]); // If no data is found, set an empty array
          }
        }
      } catch (e) {
        console.error("Failed to fetch value.", e);
      }
    }

    fetchData();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {data &&
        Array.isArray(data) &&
        data.map((val, index) => {
          return (
            <SavedInvestmentCard
              key={"saved_investment_card_" + index}
              name={val.name}
              value1={val.oneTimeInvestment}
              value2={val.monthlyInvestment}
              value3={val.rateOfReturn}
              value4={val.investmentPeriod}
            />
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#333",
    paddingHorizontal: 16,
  },
});
