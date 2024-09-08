import React from "react";
import { useTranslation } from "react-i18next";
import { View, ScrollView, StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";

const InvestmentTable = ({ investments, sip, lumpsum }) => {
  const { t } = useTranslation();

  const tableHead = [
    t("resultModal.month"),
    // "SIP Investment",
    // "Lumpsum Investment",
    // "Monthly Return",
    t("resultModal.total"),
  ];
  const tableData = investments.map((investment) => [
    investment?.month,
    // investment?.sipInvestment?.toFixed(2),
    // investment?.lumpsumInvestment?.toFixed(2),
    // investment?.monthlyReturn?.toFixed(2),
    investment?.totalValue?.toFixed(2),
  ]);

  // Adjusted additionalTableData to have labels in the first column
  const additionalTableData = [
    [
      t("resultModal.investment"),
      ,
      (lumpsum + sip * investments.length).toFixed?.(2),
    ],
    [
      t("resultModal.profit"),
      ,
      (
        investments[investments.length - 1].totalValue -
        (lumpsum + sip * investments.length)
      ).toFixed?.(2),
    ],
    [
      t("resultModal.total"),
      ,
      investments[investments.length - 1].totalValue.toFixed?.(2),
    ],
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Additional Table with Labels in First Column */}
      <View style={styles.additionalTableContainer}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={additionalTableData}
              textStyle={styles.text}
              widthArr={styles.additionalWidthArr}
            />
          </TableWrapper>
        </Table>
      </View>

      {/* Main Investment Table */}
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text}
            widthArr={styles.widthArr}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={tableData}
              textStyle={styles.text}
              widthArr={styles.widthArr}
            />
          </TableWrapper>
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    // flexGrow: 1, // Ensures ScrollView takes full height
    padding: 16,
    backgroundColor: "#fff",
  },
  container: { marginTop: 20 }, // Adds space between tables
  additionalTableContainer: { marginBottom: 20 }, // Adds space below the additional table
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  text: { margin: 6, textAlign: "center" },
  widthArr: [60, 200], // Adjust the widths as needed
  additionalWidthArr: [130, 130], // Adjust the widths as needed for the additional table
});

export default InvestmentTable;
