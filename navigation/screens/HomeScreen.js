import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

// Assuming your logo is named 'logo.svg' in the 'assets' folder (scalable vector)
import logoImage from "../logo.jpg";

export default function AdminHomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.headerText}>Admin Dashboard</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text1}>Hunger doesn’t have to exist.</Text>
        <Text style={styles.text1}>Let's end it together!</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>NGO'S</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Employee Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light background for readability
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#A0153E", // Brand color for header
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text for better contrast
  },
  contentContainer: {
    flex: 1,
    padding: 20, // Add padding for content sections
  },
  text1: {
    fontWeight: "bold",
    fontSize: "25",
    gap: 10,
  },
  button: {
    backgroundColor: "#5D0E41",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
  },
});
