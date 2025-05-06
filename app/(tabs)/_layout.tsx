import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="trending-up" size={24} color={color} />
                    ),
                    // If you want to keep the header for this screen, add: headerShown: true
                }}
            />

            <Tabs.Screen
                name="sprouty_home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                    // If you want to keep the header for this screen, add: headerShown: true
                }}
            />
            <Tabs.Screen
                name="gardener_overview"
                options={{
                    title: "Overview",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="leaf" size={24} color={color} />
                    ),
                    headerShown: false, // This explicitly hides the header for just this screen
                }}
            />
        </Tabs>
    );
}
