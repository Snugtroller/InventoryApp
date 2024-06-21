import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function DetailsScreen({ navigation }) {
  const [qrCodeText, setQrCodeText] = useState("");
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert("Permission to access camera was denied");
      }
    })();
  }, []);
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
    if (!permission) {
      return <View />;
    }

    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      );
    }

    setIsScanning(true);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const closeCamera = () => {
    setIsScanning(false);
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

    try {
      const response = await fetch("http://192.168.0.113:3000/save-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrText: data }),
      });

      const result = await response.json();
      if (result.error) {
        Alert.alert("Error", result.message);
      } else {
        Alert.alert("Success", "Scanned QR code has been saved successfully.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save scanned QR code.");
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
      <TouchableOpacity style={styles.scanButton} onPress={handleScannedQrCode}>
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>
      {isScanning && (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            facing={facing}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle}>
                <View style={styles.rectangleColor}></View>
                <View style={styles.topRight}></View>
                <View style={styles.topLeft}></View>
                <View style={styles.bottomLeft}></View>
                <View style={styles.bottomRight}></View>
              </View>
            </View>
            <View style={styles.overlay} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.closecam} onPress={closeCamera}>
                <Text style={styles.closetext}>Close</Text>
              </TouchableOpacity>
              {scanned && (
                <TouchableOpacity
                  style={styles.closecam}
                  onPress={() => setScanned(false)}
                >
                  <Text style={styles.scantext}>Scan again</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.flipcam}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.fliptext}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
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
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangleColor: {
    height: 200,
    width: 200,
    backgroundColor: "transparent",
  },
  topLeft: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    position: "absolute",
    left: -1,
    top: -1,
    borderLeftColor: "white",
    borderTopColor: "white",
  },
  topRight: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: "absolute",
    right: -1,
    top: -1,
    borderRightColor: "white",
    borderTopColor: "white",
  },
  bottomLeft: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    position: "absolute",
    left: -1,
    bottom: -1,
    borderLeftColor: "white",
    borderBottomColor: "white",
  },
  bottomRight: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    position: "absolute",
    right: -1,
    bottom: -1,
    borderRightColor: "white",
    borderBottomColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  flipcam: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  closecam: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
  },
  fliptext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  closetext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  scantext: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
