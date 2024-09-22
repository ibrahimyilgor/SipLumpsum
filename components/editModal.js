import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-4943937138677405/1530942898";

const EditModal = ({
  modalVisible,
  setModalVisible,
  data,
  setEditButtonClicked,
}) => {
  const { t } = useTranslation();

  console.log("ibrahimdata", data);
  const [name, setName] = React.useState(data?.name || "");
  const [oneTimeInvestmentAmount, setOneTimeInvestmentAmount] = React.useState(
    data?.oneTimeInvestment || ""
  );
  const [monthlyInvestment, setMonthlyInvestment] = React.useState(
    data?.monthlyInvestment || ""
  );
  const [expectedRate, setExpectedRate] = React.useState(
    data?.rateOfReturn || ""
  );
  const [periodOfInvestments, setPeriodOfInvestments] = React.useState(
    data?.investmentPeriod || ""
  );

  const [interstitial, setInterstitial] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  const loadNewAd = () => {
    const newInterstitial = InterstitialAd.createForAdRequest(adUnitId, {
      keywords: ["fashion", "clothing"],
    });

    const unsubscribeLoaded = newInterstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeClosed = newInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        // When the ad is closed, load a new one
        setLoaded(false); // Mark the current ad as no longer loaded
        loadNewAd(); // Load a new ad for the next time
      }
    );

    // Load the interstitial ad
    newInterstitial.load();

    // Set the interstitial instance to state
    setInterstitial(newInterstitial);

    // Cleanup the event listeners when component unmounts or new ad is created
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  };

  useEffect(() => {
    // Load the first ad when the component mounts
    loadNewAd();
  }, []);

  const showInterstitial = () => {
    if (loaded && interstitial) {
      interstitial.show(); // Show the ad if it's loaded
    } else {
      console.error("Ad not loaded yet or no interstitial available");
    }
  };

  useEffect(() => {
    if (modalVisible) {
      setName(data?.name || "");
      setOneTimeInvestmentAmount(data?.oneTimeInvestment || "");
      setMonthlyInvestment(data?.monthlyInvestment || "");
      setExpectedRate(data?.rateOfReturn || "");
      setPeriodOfInvestments(data?.investmentPeriod || "");
    }
  }, [modalVisible]);

  const handleSave = async () => {
    try {
      const value = await AsyncStorage.getItem("investments");

      let investments = [...value];

      // Handle calculation logic here
      console.log("One Time Investment:", oneTimeInvestmentAmount);
      console.log("Monthly Investment:", monthlyInvestment);
      console.log("Expected Rate of Return:", expectedRate);
      console.log("Period of Investment:", periodOfInvestments);

      const floatRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
      const intRegex = /^\d+$/;

      // Dismiss keyboard after calculation
      Keyboard.dismiss();

      if (
        Array.isArray(JSON.parse(value)) &&
        floatRegex.test(oneTimeInvestmentAmount) &&
        floatRegex.test(monthlyInvestment) &&
        floatRegex.test(expectedRate) &&
        intRegex.test((periodOfInvestments, 10))
      ) {
        investments = JSON.parse(value);
        investments[data?.index] = {
          name,
          oneTimeInvestment: oneTimeInvestmentAmount,
          monthlyInvestment,
          rateOfReturn: expectedRate,
          investmentPeriod: periodOfInvestments,
        };

        await AsyncStorage.setItem("investments", JSON.stringify(investments));
        showInterstitial();
        setEditButtonClicked((ebc) => !ebc);
        setModalVisible(false);
      } else {
      }
      console.log("ibrahim22", investments);
    } catch (e) {
      console.error("Failed to save value.", e);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("calculator.name")}</Text>
              <TextInput
                style={styles.input}
                placeholder={t("calculator.name")}
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>
                {t("calculator.oneTimeInvestmentAmount")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t("calculator.oneTimeInvestmentAmount")}
                placeholderTextColor="#999"
                value={oneTimeInvestmentAmount}
                onChangeText={setOneTimeInvestmentAmount}
                inputMode="decimal"
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text style={styles.label}>
                {t("calculator.monthlyInvestment")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t("calculator.monthlyInvestment")}
                placeholderTextColor="#999"
                value={monthlyInvestment}
                onChangeText={setMonthlyInvestment}
                inputMode="decimal"
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text style={styles.label}>{t("calculator.expectedRate")}</Text>
              <TextInput
                style={styles.input}
                placeholder={t("calculator.expectedRate")}
                placeholderTextColor="#999"
                value={expectedRate}
                onChangeText={setExpectedRate}
                inputMode="decimal"
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Text style={styles.label}>
                {t("calculator.periodOfInvestments")}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t("calculator.periodOfInvestments")}
                placeholderTextColor="#999"
                value={periodOfInvestments}
                onChangeText={setPeriodOfInvestments}
                inputMode="decimal"
                keyboardType="numeric"
                returnKeyType="done"
              />
              <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{t("calculator.update")}</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  scrollViewContent: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 30,
    marginBottom: 15,
    width: "90%",
    minHeight: "0%",
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
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditModal;
