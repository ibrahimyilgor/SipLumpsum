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
              <Image
                source={require("../assets/cancel.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
});

export default ResultModal;
