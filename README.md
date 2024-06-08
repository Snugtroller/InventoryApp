## **Overview**<br/>
The mobile application allows admins to manage and view their personal data, including home information, detailed lists, and database records. Additionally, the application enables admins to generate and scan QR codes, typically used for managing inventory in a supermarket setting. The QR codes are placed on food packets, and when scanned, these packets are entered into the database with a unique ID.<br/>

## **Main Flow**<br/>
Launch Application:
•	The admin taps on the app icon to launch the application.
•	The component renders the bottom tab navigator with the home screen as the initial route.
Navigate to Home Screen:
•	The admin sees the home screen, which provides general information and updates.
•	The screen is represented by the Home Screen component.
Navigate to Details Screen:
•	The admin taps on the "Details" tab in the bottom navigation bar.
•	The app navigates to the Details screen.
•	The admin can generate QR codes and scan them on this tab.
Navigate to Database Screen:
•	The admin taps on the "Database" tab in the bottom navigation bar.
•	The app navigates to the Database screen.
•	The admin views and manages database records on this screen.
Admin Generates QR Codes:
•	The admin navigates to the QR code generation feature.
•	The admin generates QR codes that will be placed on food packets.
Admin Scans QR Codes:
•	The admin uses the app's scanning feature to scan QR codes on food packets.
•	Each scanned food packet is entered into the database with a unique ID.

![image](https://github.com/Snugtroller/InventoryApp/assets/113275985/99db4a48-1e53-4596-897a-9cfdaebe5529)

## **Conclusion**<br/>
This React Native project provides a robust and user-friendly solution for managing personal data and inventory through an intuitive bottom tab navigation system. The added functionality for QR code generation and scanning enhances the app's utility, particularly for admins managing food packet inventory. The use case demonstrates the application's flow, highlighting its ease of use and the benefits of using React Native for cross-platform development.
