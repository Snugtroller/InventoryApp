import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";

export function DetailsScreen({ navigation }) {
  const [qrCodeText, setQrCodeText] = React.useState("");

  return (
    <View style={styles.screen}>
      <Text onPress={() => navigation.navigate("Home")} style={styles.title}>
        QR Generator
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Code"
          placeholderTextColor="gray" // Ensuring the placeholder is visible on black background
          style={styles.input}
          onChangeText={(text) => setQrCodeText(text)}
          value={qrCodeText}
        />
        {qrCodeText ? (
          <View style={styles.qrCodeContainer}>
            <QRCode value={qrCodeText} size={100} />
          </View>
        ) : (
          <Text style={styles.placeholderText}>
            Enter text to generate QR code
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => alert("on progress")}
            title="Save to Database"
            color="red"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50, // Adding some padding to push the content a bit down from the top
    backgroundColor: "black", // Setting the background color to black
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white", // Changing the text color to white for better visibility
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    color: "white", // Changing input text color to white for better visibility
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
    color: "white",
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});

export default DetailsScreen;
