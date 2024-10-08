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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { useNavigation } from "@react-navigation/native";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-4943937138677405/1530942898";

const SaveModal = ({
  modalVisible,
  setModalVisible,
  oneTimeInvestment,
  monthlyInvestment,
  rateOfReturn,
  investmentPeriod,
  setOneTimeInvestment,
  setMonthlyInvestment,
  setRateOfReturn,
  setInvestmentPeriod,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [name, setName] = React.useState("");
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

  const handleSave = async () => {
    try {
      let investments = [];

      const value = await AsyncStorage.getItem("investments");
      console.log("ibrahim2", value, JSON.parse(value));

      if (JSON.parse(value) !== null) {
        investments = JSON.parse(value);
        investments.push({
          name,
          oneTimeInvestment,
          monthlyInvestment,
          rateOfReturn,
          investmentPeriod,
        });
      } else {
        investments = [
          {
            name,
            oneTimeInvestment,
            monthlyInvestment,
            rateOfReturn,
            investmentPeriod,
          },
        ];
      }

      await AsyncStorage.setItem("investments", JSON.stringify(investments));

      setOneTimeInvestment(),
        setMonthlyInvestment(),
        setRateOfReturn(),
        setInvestmentPeriod();

      showInterstitial();
      setName("");
      setModalVisible(false);
      navigation.navigate(t("navigation.savedInvestments"));
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
          <View style={styles.modalView}>
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
              <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{t("calculator.save")}</Text>
              </Pressable>
            </View>
          </View>
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
    // minHeight: "50%",
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

export default SaveModal;
