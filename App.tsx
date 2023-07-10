import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useIsConnectedToAbly } from "./ably";
import { ChannelListView } from "./ChannelList";

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
    <SafeAreaView>
      <ChannelListView />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
