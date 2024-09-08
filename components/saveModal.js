import React from "react";
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

const SaveModal = ({
  modalVisible,
  setModalVisible,
  oneTimeInvestment,
  monthlyInvestment,
  rateOfReturn,
  investmentPeriod,
}) => {
  const { t } = useTranslation();
  const [name, setName] = React.useState("");

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
              <Image
                source={require("../assets/cancel.png")}
                style={styles.closeIcon}
              />
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
