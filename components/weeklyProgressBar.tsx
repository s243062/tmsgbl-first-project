import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface WeeklyProgressBarProps {
    percentage: number; // Value between 0 and 1
}

const WeeklyProgressBar: React.FC<WeeklyProgressBarProps> = ({
    percentage,
}) => {
    // Determine the active icon based on the percentage
    let activeIcon = "red"; // Default to red
    if (percentage > 0.66) {
        activeIcon = "green";
    } else if (percentage > 0.33) {
        activeIcon = "yellow";
    }

    // Icon paths
    const icons = {
        red: {
            active: require("@/assets/images/witherRed.png"),
            default: require("@/assets/images/witherRedFade.png"),
        },
        yellow: {
            active: require("@/assets/images/sproutyYellProgress.png"),
            default: require("@/assets/images/sproutyYellFade.png"),
        },
        green: {
            active: require("@/assets/images/bloomGr.png"),
            default: require("@/assets/images/bloomGrFade.png"),
        },
    };

    // Determine the color based on the percentage
    let outerBarColor = "#E9D3CC"; // Default to light red
    let innerBarColor = "#D9907E"; // Default to dark red
    if (percentage > 0.66) {
        outerBarColor = "#D7F3E9"; // Light green
        innerBarColor = "#7ED9B7"; // Dark green
    } else if (percentage > 0.33) {
        outerBarColor = "#EAE8D2"; // Light yellow
        innerBarColor = "#DAD083"; // Dark yellow
    }

    return (
        <View style={styles.container}>
            {/* Icons */}

            <Image
                source={
                    activeIcon === "yellow"
                        ? icons.yellow.active
                        : icons.yellow.default
                }
                style={styles.iconYell}
            />

            <View style={[styles.iconsContainer, {}]}>
                <Image
                    source={
                        activeIcon === "red"
                            ? icons.red.active
                            : icons.red.default
                    }
                    style={styles.iconRed}
                />
                {/* Outer Bar */}
                <View
                    style={[
                        styles.outerBar,
                        { backgroundColor: outerBarColor },
                    ]}
                >
                    <View
                        style={[
                            styles.parting,
                            { left: "33%", backgroundColor: "#DBAFA1" }, // Yellow parting
                        ]}
                    />
                    <View
                        style={[
                            styles.parting,
                            { left: "66%", backgroundColor: "#A9EED6" }, // Green parting
                        ]}
                    />
                    {/* Inner Bar */}
                    <View
                        style={[
                            styles.innerBar,
                            {
                                width: `${percentage * 100}%`,
                                backgroundColor: innerBarColor,
                            },
                        ]}
                    />
                </View>
                <Image
                    source={
                        activeIcon === "green"
                            ? icons.green.active
                            : icons.green.default
                    }
                    style={styles.iconGr}
                />
            </View>

            {/* Label */}
            <Text style={styles.label}>Sprouty's well-being this week</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginTop: -35,
        marginBottom: 38,
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "87%",
        marginBottom: 2,
    },
    iconRed: {
        width: 37,
        height: 45,
    },
    iconYell: {
        marginBottom: -5,
        width: 35,
        height: 27,
    },
    iconGr: {
        width: 37,
        height: 45,
    },
    outerBar: {
        width: "80%",
        height: 20,
        borderRadius: 10,
        padding: 3,

        justifyContent: "center",
    },
    innerBar: {
        height: "100%",
        borderRadius: 10,
    },
    parting: {
        position: "absolute",
        top: -3, // Extend above the outer bar
        bottom: -3, // Extend below the outer bar
        width: 4, // Thickness of the parting
        zIndex: 1, // Ensure partings are displayed on top of both bars
        borderRadius: 6,
    },
    label: {
        marginTop: -10,
        fontSize: 14,
        color: "#4D4D4D",
    },
});

export default WeeklyProgressBar;
