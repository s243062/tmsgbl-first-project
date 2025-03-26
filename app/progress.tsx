import { Text, View } from "react-native";

export default function Progress() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Progress</Text>
      <Text>Track your gardening progress here.</Text>
    </View>
  );
}
