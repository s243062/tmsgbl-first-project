import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SleepView() {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get("window").width;

    const sproutyChart1 = require("@/assets/images/sproutyChart1.png");
    const sproutyChart2 = require("@/assets/images/sproutyChart2.png");
    const sproutyChart3 = require("@/assets/images/sproutyChart3.png");

    const [currentChartIndex, setCurrentChartIndex] = useState(0);
    const charts = [sproutyChart1, sproutyChart2, sproutyChart3];

    const goToNextChart = () => {
        if (currentChartIndex < charts.length - 1) {
            setCurrentChartIndex(currentChartIndex + 1);
        }
    };

    const goToPrevChart = () => {
        if (currentChartIndex > 0) {
            setCurrentChartIndex(currentChartIndex - 1);
        }
    };

    const router = useRouter();

    const navigateToProgress = () => {
        router.push("/progress"); // ← file-based path
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={navigateToProgress}
                >
                    <Image
                        source={require("@/assets/images/back-arrow.png")}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sprouty Progress</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Weekly Report Component */}

                <View
                    style={[
                        styles.chartWrapper,
                        {
                            width: screenWidth - 24,
                            height: 475,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 24,
                        },
                    ]}
                >
                    <Image
                        source={charts[currentChartIndex]}
                        style={[
                            {
                                width: 375,
                            },
                            { resizeMode: "contain" },
                        ]}
                    />
                </View>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: screenWidth - 32,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={goToPrevChart} // Make the whole area clickable
                        disabled={currentChartIndex === 0} // Disable Prev on the first chart
                    >
                        <Ionicons
                            name="chevron-back"
                            size={32}
                            color={
                                currentChartIndex === 0 ? "#D3D3D3" : "#7B7B7B"
                            }
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                color:
                                    currentChartIndex === 0
                                        ? "#D3D3D3"
                                        : "#7B7B7B",
                            }}
                        >
                            Prev
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={goToNextChart} // Make the whole area clickable
                        disabled={currentChartIndex === charts.length - 1}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color:
                                    currentChartIndex === charts.length - 1
                                        ? "#D3D3D3"
                                        : "#7B7B7B",
                            }}
                        >
                            Next
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={32}
                            color={
                                currentChartIndex === charts.length - 1
                                    ? "#D3D3D3"
                                    : "#7B7B7B"
                            }
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        //paddingTop: 40,
    },
    scrollContainer: {
        alignItems: "center",
        paddingBottom: 40,
    },
    // Weekly Report styles
    reportCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 500,
        color: "#333",
        marginBottom: 12,
    },
    averageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    currentAverageLabel: {
        fontSize: 16,
        color: "#555",
    },
    currentAverageValue: {
        fontSize: 16,
        fontWeight: 600,
        color: "#333",
        marginLeft: 4,
    },
    previousAverageText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 8,
    },
    percentChangeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    arrowIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
        tintColor: "#4CAF50", // Green color for positive change
    },
    percentChangeText: {
        fontSize: 14,
        color: "#4CAF50", // Green color for positive change
    },
    chartWrapper: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 10,
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
        marginTop: 15,
    },
});
