import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TextInput,
  Keyboard,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ResultModal from "../components/resultModal";
import SaveModal from "../components/saveModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Calculator() {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const [oneTimeInvestment, setOneTimeInvestment] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");

  const handleSave = async () => {
    setSaveModalVisible(true);
  };

  const handleCalculate = () => {
    // Handle calculation logic here
    console.log("One Time Investment:", oneTimeInvestment);
    console.log("Monthly Investment:", monthlyInvestment);
    console.log("Expected Rate of Return:", rateOfReturn);
    console.log("Period of Investment:", investmentPeriod);

    const floatRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
    const intRegex = /^\d+$/;

    if (
      floatRegex.test(parseFloat(oneTimeInvestment)) &&
      floatRegex.test(parseFloat(monthlyInvestment)) &&
      floatRegex.test(parseFloat(rateOfReturn)) &&
      intRegex.test(parseInt(investmentPeriod, 10))
    ) {
      setModalVisible(true);
    }

    // Dismiss keyboard after calculation
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("calculator.oneTimeInvestmentAmount")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("calculator.enterAmount")}
              placeholderTextColor="#999"
              value={oneTimeInvestment}
              onChangeText={setOneTimeInvestment}
              inputMode="decimal"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("calculator.monthlyInvestment")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("calculator.enterAmount")}
              placeholderTextColor="#999"
              value={monthlyInvestment}
              onChangeText={setMonthlyInvestment}
              inputMode="decimal"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t("calculator.expectedRate")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("calculator.enterRate")}
              placeholderTextColor="#999"
              value={rateOfReturn}
              onChangeText={setRateOfReturn}
              inputMode="decimal"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t("calculator.periodOfInvestments")}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t("calculator.enterPeriod")}
              placeholderTextColor="#999"
              value={investmentPeriod}
              onChangeText={setInvestmentPeriod}
              inputMode="decimal"
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
          <Pressable style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>{t("calculator.calculate")}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>{t("calculator.save")}</Text>
          </Pressable>
          <ResultModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            calculationInput={{
              oneTimeInvestment,
              monthlyInvestment,
              rateOfReturn,
              investmentPeriod,
            }}
          />
          <SaveModal
            modalVisible={saveModalVisible}
            setModalVisible={setSaveModalVisible}
            oneTimeInvestment={oneTimeInvestment}
            monthlyInvestment={monthlyInvestment}
            rateOfReturn={rateOfReturn}
            investmentPeriod={investmentPeriod}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#333",
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    color: "#ccc",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#444",
    color: "#fff",
    paddingHorizontal: 8,
  },
  button: {
    height: 40,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
