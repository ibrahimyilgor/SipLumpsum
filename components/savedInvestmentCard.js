import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ResultModal from "./resultModal";

const SavedInvestmentCard = ({ name, value1, value2, value3, value4 }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>
        {`${t("calculator.oneTimeInvestmentAmount")}: `}
        {value1}
      </Text>
      <Text style={styles.value}>
        {`${t("calculator.monthlyInvestment")}: `}
        {value2}
      </Text>
      <Text style={styles.value}>
        {`${t("calculator.expectedRate")}: `}
        {value3}
      </Text>
      <Text style={styles.value}>
        {`${t("calculator.periodOfInvestments")}: `}
        {value4}
      </Text>
      <ResultModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        calculationInput={{
          oneTimeInvestment: value1,
          monthlyInvestment: value2,
          rateOfReturn: value3,
          investmentPeriod: value4,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default SavedInvestmentCard;
