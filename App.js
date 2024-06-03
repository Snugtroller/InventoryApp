import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainContainer from "./navigation/MainContainer";

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainContainer />
    </GestureHandlerRootView>
  );
}

export default App;
