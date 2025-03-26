import { Text, View } from "react-native";

export default function GardenerOverview() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Gardener Overview</Text>
      <Text>Here you can see an overview of your garden.</Text>
    </View>
  );
}
