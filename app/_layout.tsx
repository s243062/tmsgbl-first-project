import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons if not already installed
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mila_playground"
        options={{
          title: "Mila Playground",
          tabBarIcon: ({ color }) => <Ionicons name="flask" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
