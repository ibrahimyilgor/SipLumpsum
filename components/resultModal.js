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
} from "react-native";
import {
  calculateSipLumpsum,
  calculateSipLumpsumTable,
} from "../algorithms/sip";
import InvestmentTable from "./table";
import { Ionicons } from "@expo/vector-icons";

const ResultModal = ({ modalVisible, setModalVisible, calculationInput }) => {
  const { t } = useTranslation();

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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.centeredView}>
                {calculationInput?.name?.length > 25
                  ? `${calculationInput?.name.substring(0, 25)}...`
                  : calculationInput?.name}
              </Text>

              <InvestmentTable
                investments={calculateSipLumpsumTable(
                  parseFloat(calculationInput.monthlyInvestment),
                  parseFloat(calculationInput.oneTimeInvestment),
                  parseFloat(calculationInput.rateOfReturn),
                  parseFloat(calculationInput.investmentPeriod)
                )}
                sip={parseFloat(calculationInput.monthlyInvestment)}
                lumpsum={parseFloat(calculationInput.oneTimeInvestment)}
              />
            </ScrollView>
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
    padding: 15, // Optional: Add some padding for better layout
    alignItems: "center",
    shadowColor: "#000", // Shadow properties for iOS
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10, // Elevation for Android
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
});

export default ResultModal;
