import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function DatabaseScreen({ navigation }) {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const fetchQrCodes = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.113:3000/get-last-qr-codes"
        );
        const data = await response.json();
        if (!data.error) {
          setQrCodes(data.data);
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchQrCodes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.S_No}</Text>
      <Text style={styles.cell}>{item.Gen_ID}</Text>
      <Text style={styles.cell}>{item.date_time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Home")} style={styles.title}>
        Last 5 Generated QR Codes
      </Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>S.No</Text>
          <Text style={styles.headerCell}>Gen</Text>
          <Text style={styles.headerCell}>Gen Time</Text>
        </View>
        <FlatList
          data={qrCodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.S_No.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});
