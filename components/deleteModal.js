import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

const DeleteModal = ({
  deleteModalVisible,
  setDeleteModalVisible,
  data,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={deleteModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setDeleteModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {t("deleteModal.areYouSureToDelete")}
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onDelete(data?.index);
                setDeleteModalVisible(false);
              }} // Wrap with an anonymous function
            >
              <Text style={styles.buttonText}>{t("deleteModal.yes")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.buttonText}>{t("deleteModal.no")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background dimming effect
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20, // Add padding inside the modal
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Responsive width
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center", // Center the text inside the modal
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#C96868",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DeleteModal;
