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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import EditModal from "../components/editModal";

export default function SavedInvestments() {
  const [data, setData] = React.useState([]);
  const [editButtonClicked, setEditButtonClicked] = useState(false);

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
  }, [isFocused, editButtonClicked]);

  const onDelete = async (index) => {
    try {
      if (isFocused) {
        if (index >= 0 && index < data.length) {
          // Parse the string back into an array
          // setData(JSON.parse(value));
          let tempData = [...data];
          console.log("ibrahim6", tempData, index);
          tempData.splice(index, 1);
          await AsyncStorage.setItem("investments", JSON.stringify(tempData));
          console.log("ibrahim7", tempData, index);
          setData(tempData);
        } else {
          // setData([]); // If no data is found, set an empty array
        }
      }
    } catch (e) {
      console.error("Failed to fetch value.", e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {data &&
        Array.isArray(data) &&
        data.map((val, index) => {
          return (
            <SavedInvestmentCard
              key={"saved_investment_card_" + index}
              index={index}
              name={val.name}
              value1={val.oneTimeInvestment}
              value2={val.monthlyInvestment}
              value3={val.rateOfReturn}
              value4={val.investmentPeriod}
              onDelete={onDelete}
              setEditButtonClicked={setEditButtonClicked}
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
