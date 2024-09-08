import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Table = () => {
  // Sample data for the table
  const tableData = [
    {
      col1: "Row 1, Col 1",
      col2: "Row 1, Col 2",
      col3: "Row 1, Col 3",
      col4: "Row 1, Col 4",
    },
    {
      col1: "Row 2, Col 1",
      col2: "Row 2, Col 2",
      col3: "Row 2, Col 3",
      col4: "Row 2, Col 4",
    },
    {
      col1: "Row 3, Col 1",
      col2: "Row 3, Col 2",
      col3: "Row 3, Col 3",
      col4: "Row 3, Col 4",
    },
    {
      col1: "Row 1, Col 1",
      col2: "Row 1, Col 2",
      col3: "Row 1, Col 3",
      col4: "Row 1, Col 4",
    },
    {
      col1: "Row 2, Col 1",
      col2: "Row 2, Col 2",
      col3: "Row 2, Col 3",
      col4: "Row 2, Col 4",
    },
    {
      col1: "Row 3, Col 1",
      col2: "Row 3, Col 2",
      col3: "Row 3, Col 3",
      col4: "Row 3, Col 4",
    },
    {
      col1: "Row 1, Col 1",
      col2: "Row 1, Col 2",
      col3: "Row 1, Col 3",
      col4: "Row 1, Col 4",
    },
    {
      col1: "Row 2, Col 1",
      col2: "Row 2, Col 2",
      col3: "Row 2, Col 3",
      col4: "Row 2, Col 4",
    },
    {
      col1: "Row 3, Col 1",
      col2: "Row 3, Col 2",
      col3: "Row 3, Col 3",
      col4: "Row 3, Col 4",
    },
    {
      col1: "Row 1, Col 1",
      col2: "Row 1, Col 2",
      col3: "Row 1, Col 3",
      col4: "Row 1, Col 4",
    },
    {
      col1: "Row 2, Col 1",
      col2: "Row 2, Col 2",
      col3: "Row 2, Col 3",
      col4: "Row 2, Col 4",
    },
    {
      col1: "Row 3, Col 1",
      col2: "Row 3, Col 2",
      col3: "Row 3, Col 3",
      col4: "Row 3, Col 4",
    },
    // Add more rows as needed
  ];

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>Column 1</Text>
        <Text style={styles.columnHeader}>Column 2</Text>
        <Text style={styles.columnHeader}>Column 3</Text>
        <Text style={styles.columnHeader}>Column 4</Text>
      </View>

      {/* Table Body */}
      {tableData.map((rowData, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{rowData.col1}</Text>
          <Text style={styles.cell}>{rowData.col2}</Text>
          <Text style={styles.cell}>{rowData.col3}</Text>
          <Text style={styles.cell}>{rowData.col4}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  columnHeader: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    fontSize: 15,
    flex: 1,
    textAlign: "center",
  },
});

export default Table;
