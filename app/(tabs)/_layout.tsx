import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function AppLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Hide the header globally
                tabBarShowLabel: false, // Hide text labels under icons
                tabBarStyle: {
                    height: 80, // Increase the height of the tab bar
                    backgroundColor: "#ffffff", // Customize the background color
                    borderTopColor: "#C2C2C2", // Add a top border
                    borderTopWidth: 1.5, // Add a top border width
                    paddingTop: 20,
                },
            }}
        >
            <Tabs.Screen
                name="progress"
                options={{
                    title: "Progress",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("@/assets/images/bottomMenu/progressMenu.png")}
                            style={{
                                width: 50,
                                height: 29,
                            }}
                        />
                    ),
                    // If you want to keep the header for this screen, add: headerShown: true
                }}
            />

            <Tabs.Screen
                name="sprouty_home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("@/assets/images/bottomMenu/sproutyMenu.png")}
                            style={{
                                width: 64,
                                height: 50,
                            }}
                        />
                    ),
                    // If you want to keep the header for this screen, add: headerShown: true
                }}
            />
            <Tabs.Screen
                name="gardener_overview"
                options={{
                    title: "Overview",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require("@/assets/images/bottomMenu/gardenerMenu.png")}
                            style={{
                                width: 50,
                                height: 44,
                            }}
                        />
                    ),
                    headerShown: false, // This explicitly hides the header for just this screen
                }}
            />
        </Tabs>
    );
}
