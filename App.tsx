import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useIsConnectedToAbly } from "./ably";

const App = () => {
  const isConnected = useIsConnectedToAbly();

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text>Connecting...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Connected</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
