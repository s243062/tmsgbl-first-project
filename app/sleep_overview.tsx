import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { List, Text } from "react-native-paper";

export default function SleepOverview() {
    const navigation = useNavigation();
    const [expandedDetails, setExpandedDetails] = useState(false);

    const handlePressDetails = () => setExpandedDetails(!expandedDetails);

    const router = useRouter();

    const navigateToGardenerOverview = () => {
        router.push("/gardener_overview"); // ← file-based path
    };
    const navigateToSteps = () => {
        router.push("/steps_overview"); // ← file-based path
    };
    const navigateToScreenTime = () => {
        router.push("/screen_time_overview");
    };

    return (
        <View style={styles.container}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigateToGardenerOverview()}
                >
                    <Image
                        source={require("@/assets/images/back-arrow.png")}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sleep Overview</Text>
            </View>

            {/* Gardener image */}
            <View style={styles.gardenerContainer}>
                <Image
                    source={require("@/assets/images/GardenerCircleWithBackground.png")}
                    style={styles.gardenerImage}
                    resizeMode="contain"
                />
            </View>

            <ScrollView
                style={styles.contentScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {/* Highlights section */}
                <Text style={styles.HighlightsTitle}>Highlights</Text>
                <View style={styles.highlightBubble}>
                    <Text style={styles.highlightText}>
                        You've met your sleep goal 5 nights this week-Sprouty is
                        thriving with your rest! Your average sleep duration has
                        increased by 8% compared to last week <Text>🌙</Text>.
                        Keep up the restful nights!
                    </Text>
                </View>

                {/* Activity Correlations section */}
                <Text style={styles.CorrelationTitle}>
                    Activity Correlations
                </Text>
                <View style={styles.correlationCard}>
                    <Text style={styles.correlationText}>
                        • On days when you get 7+ hours of sleep, you tend to
                        take more steps <Text>👣</Text> and have 30% less screen
                        time the following day :))
                    </Text>
                </View>

                {/* Tips Accordion section */}
                <List.Accordion
                    title="Tips for you"
                    expanded={expandedDetails}
                    onPress={handlePressDetails}
                    style={styles.accordion}
                    titleStyle={styles.accordionTitle}
                    left={(props) => (
                        <Image
                            source={require("@/assets/images/SleepImage.png")}
                            style={styles.accordionIcon}
                        />
                    )}
                >
                    <View style={styles.tipsContainer}>
                        <Text style={styles.tipItem}>
                            • Try to maintain a consistent sleep schedule, even
                            on weekends
                        </Text>
                        <Text style={styles.tipItem}>
                            • Avoid screen time at least 30 minutes before
                            bedtime to improve sleep quality
                        </Text>
                    </View>
                </List.Accordion>

                {/* Add padding at the bottom to ensure content isn't hidden by navigation buttons */}
                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Bottom Navigation Buttons with Chevrons */}
            <View style={styles.bottomNavContainer}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={navigateToSteps}
                >
                    <Text style={styles.chevron}>{"<"}</Text>
                    <Text style={styles.navButtonText}>Steps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navButton}
                    onPress={navigateToScreenTime}
                >
                    <Text style={styles.navButtonText}>Screen Time</Text>
                    <Text style={styles.chevron}>{">"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 30,
        padding: 5,
        position: "absolute",
        left: 20,
        zIndex: 1,
    },
    backIcon: {
        //width: 24,
        //height: 24,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "400",
        color: "#000000",
        textAlign: "center",
        width: "100%",
    },
    gardenerContainer: {
        alignItems: "center",
        marginVertical: 5,
    },
    gardenerImage: {
        //width: 200,
        //height: 200,
    },
    contentScrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollViewContent: {
        paddingBottom: 100, // Add padding to ensure content isn't hidden by bottom nav
    },
    HighlightsTitle: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "400",
        color: "#333333",
        marginBottom: 5,
        marginTop: 5,
    },
    CorrelationTitle: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "300",
        color: "#333333",
        marginBottom: 5,
        marginTop: 5,
    },
    highlightBubble: {
        backgroundColor: "#B6FFDA",
        borderRadius: 25,
        padding: 20,
        marginBottom: 10,
        alignSelf: "center",
        width: "90%",
        maxWidth: 500,
    },
    highlightText: {
        marginLeft: 5,
        fontSize: 16,
        lineHeight: 24,
        color: "#333333",
    },
    correlationCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        alignSelf: "center",
        width: "90%",
        maxWidth: 500,
    },
    correlationText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333333",
    },
    sleepIcon: {
        color: "#3B82F6",
    },
    // Accordion styles
    accordion: {
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        marginBottom: 15,
        overflow: "hidden",
        alignSelf: "center",
        width: "90%",
        maxWidth: 500,
    },
    accordionIcon: {
        marginLeft: 12,
        marginTop: 5,
        tintColor: "#16A150",
    },
    accordionTitle: {
        color: "#303030",
        fontSize: 16,
        fontWeight: "500",
    },
    tipsContainer: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        paddingTop: 5,
    },
    tipItem: {
        fontSize: 16,
        color: "#333333",
        marginBottom: 10,
        lineHeight: 22,
    },
    bottomPadding: {
        height: 80, // Extra padding at the bottom
    },
    // Bottom Navigation styles
    bottomNavContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "transparent",
        borderTopWidth: 0,
    },
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    navButtonText: {
        fontSize: 16,
        color: "#999999",
        fontWeight: "300",
        borderBottomWidth: 1,
        borderBottomColor: "#999999",
    },
    chevron: {
        fontSize: 24,
        color: "#999999",
        marginHorizontal: 8,
    },
});
