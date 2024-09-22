import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ResultModal from "./resultModal";
import { Ionicons } from "@expo/vector-icons";
import EditModal from "./editModal";
import DeleteModal from "./deleteModal";

const SavedInvestmentCard = ({
  name,
  index,
  value1,
  value2,
  value3,
  value4,
  onDelete,
  setEditButtonClicked,
}) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onEdit = () => {
    setEditModalVisible(true);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {name?.length > 25 ? `${name.substring(0, 25)}...` : name}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onEdit}>
            <Ionicons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
            <Ionicons
              name="trash"
              size={24}
              color="red"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
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
          name,
          oneTimeInvestment: value1,
          monthlyInvestment: value2,
          rateOfReturn: value3,
          investmentPeriod: value4,
        }}
      />
      <EditModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        data={{
          index: index,
          name: name,
          oneTimeInvestment: value1,
          monthlyInvestment: value2,
          rateOfReturn: value3,
          investmentPeriod: value4,
        }}
        setEditButtonClicked={setEditButtonClicked}
      />
      <DeleteModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        data={{
          index: index,
        }}
        onDelete={onDelete}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
  },
  deleteIcon: {
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default SavedInvestmentCard;
