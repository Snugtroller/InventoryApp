import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function DetailsScreen({ navigation }) {
  const [qrCodeText, setQrCodeText] = useState("");

  const saveToDatabase = async () => {
    try {
      const response = await fetch("http://192.168.0.113:3000/save-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrText: qrCodeText }),
      });

      const data = await response.json();
      if (data.error) {
        Alert.alert("Error", data.message);
      } else {
        Alert.alert("Success", "QR code has been saved successfully.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save QR code.");
    }
  };

  const handleScannedQrCode = async () => {
    Alert.alert(
      "Scanned QR Code",
      "This button would initiate QR code scanning functionality."
    );
  };

  return (
    <View style={styles.screen}>
      <Text onPress={() => navigation.navigate("Home")} style={styles.title}>
        QR Generator
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Code"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={(text) => setQrCodeText(text)}
          value={qrCodeText}
        />
        {qrCodeText ? (
          <View style={styles.qrCodeContainer}>
            <QRCode value={qrCodeText} size={150} />
          </View>
        ) : (
          <Text style={styles.placeholderText}>
            Enter text to generate QR code
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={saveToDatabase}>
          <Text style={styles.buttonText}>Save to Database</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={handleScannedQrCode}>
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#ff5c5c",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    color: "#ffffff",
    backgroundColor: "#333333",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#444444",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: "#bbbbbb",
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#A91D3A",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scanButton: {
    marginTop: 30,
    backgroundColor: "#3A1DA9",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  scanButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
