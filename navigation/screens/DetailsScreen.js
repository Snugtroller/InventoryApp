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

export function DetailsScreen({ navigation }) {
  const [qrCodeText, setQrCodeText] = useState("");

  // Function to save QR code text to database
  const saveToDatabase = async () => {
    try {
      const response = await fetch("http://192.168.0.131:3000/save-qr", {
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
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
    color: "#fff",
    backgroundColor: "#2e2e2e",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#ff5c5c",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetailsScreen;
