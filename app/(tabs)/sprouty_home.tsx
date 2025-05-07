import TodaysStats from "@/components/TodaysStats";
import WeeklyProgressBar from "@/components/weeklyProgressBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    View,
} from "react-native";
import { Text } from "react-native-paper";

const sproutyImages = [
    require("@/assets/images/sprouty/sprouty1.png"),
    require("@/assets/images/sprouty/sprouty2.png"),
    require("@/assets/images/sprouty/sprouty3.png"),
    require("@/assets/images/sprouty/sprouty4.png"),
];

export default function SproutyHome() {
    const router = useRouter();

    const [currentSprouty, setCurrentSprouty] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const changeImage = () => {
        setCurrentSprouty((prevState) => (prevState === 4 ? 1 : prevState + 1));
    };

    const sproutyImageSource = () => {
        switch (currentSprouty) {
            case 1:
                return require("@/assets/images/sprouty/sprouty1.png");
            case 2:
                return require("@/assets/images/sprouty/sprouty2.png");
            case 3:
                return require("@/assets/images/sprouty/sprouty3.png");
            case 4:
                return require("@/assets/images/sprouty/sprouty4.png");
            default:
                return require("@/assets/images/sprouty/sprouty1.png");
        }
    };

    return (
        <ScrollView
            className="ProgressTabContainer"
            contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            style={{ backgroundColor: "#ffffff" }}
        >
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)} // Close modal on back press
            >
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                    }}
                >
                    <View
                        style={{
                            width: "80%",
                            backgroundColor: "#FDFDFD",
                            borderWidth: 2,
                            borderColor: "#50CE9F",
                            borderRadius: 6,
                            padding: 20,
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "light",
                                marginBottom: 35,
                                width: "45%",
                                textAlign: "center",
                            }}
                        >
                            Your Weekly Update is Here!
                        </Text>
                        <Image
                            source={require("@/assets/images/weeklyUpdateIcon.png")} // Replace with your icon
                            style={{
                                width: 112,
                                height: 87,
                                marginBottom: 15,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                                color: "#50CE9F",
                                marginBottom: 38,
                            }}
                        >
                            Sprouty's thriving!
                        </Text>
                        <Text
                            style={{
                                width: "97%",
                                fontSize: 14,
                                alignItems: "flex-start",
                                marginBottom: 12,
                                display: "flex",
                                flexDirection: "column",
                                fontWeight: "light",
                            }}
                        >
                            <Text>
                                You crushed{" "}
                                <Text style={{ fontWeight: "bold" }}>
                                    17 of 21 goals
                                </Text>{" "}
                                this week.
                            </Text>
                            <Text>Amazing progress! 🌱💪</Text>
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                marginBottom: 8,
                                width: "97%",
                                alignItems: "flex-start",
                                display: "flex",
                                flexDirection: "column",
                                fontWeight: "light",
                            }}
                        >
                            🌟 Ready to grow even more?
                        </Text>
                        <TouchableHighlight
                            style={{
                                backgroundColor: "#50CE9F",
                                width: "97%",
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 6,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            underlayColor="#50CE9F"
                            onPress={() => {
                                setIsModalVisible(false); // Close modal
                                router.push("/gardener_overview");
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontWeight: "medium",
                                    }}
                                >
                                    Head to your{" "}
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "#ffffff",
                                        }}
                                    >
                                        gardener
                                    </Text>
                                </Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={24}
                                    color="#ffffff"
                                />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                            }}
                            underlayColor="#DDDDDD"
                            onPress={() => setIsModalVisible(false)} // Close modal
                        >
                            <Ionicons name="close" size={42} color="#50CE9F" />
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <View
                className="SproutyTabHeader"
                style={{
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 40,
                    paddingTop: 20,
                    paddingHorizontal: 32,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: 300,
                        }}
                    >
                        Sprouty
                    </Text>
                </View>

                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Image
                            source={require("@/assets/images/settingsIcon.png")}
                            style={[
                                {
                                    width: 42.47,
                                },
                                { resizeMode: "contain" },
                            ]}
                        />
                    </TouchableHighlight>
                </View>
            </View>

            <View
                style={{
                    width: 375,
                    height: 375,
                    position: "relative",
                    marginTop: -15,
                }}
            >
                <Image
                    source={require("@/assets/images/rectanglesMain.png")}
                    style={[
                        {
                            width: 279,
                            height: 277,
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: [{ translateX: -279 / 2 }],
                            zIndex: 0,
                        },
                        { resizeMode: "contain" },
                    ]}
                />
                <TouchableHighlight
                    onPress={changeImage}
                    underlayColor="rgba(0, 0, 0, 0.2)" // When pressed, slightly darken the image
                    activeOpacity={0.5} // Controls the opacity when the image is pressed
                >
                    <Image
                        source={sproutyImageSource()}
                        style={[
                            {
                                width: 375,
                                height: 375,
                                position: "absolute",
                                top: -20,
                                left: "50%",
                                transform: [{ translateX: -375 / 2 }],
                                zIndex: 1,
                            },
                            { resizeMode: "contain" },
                        ]}
                    />
                </TouchableHighlight>
            </View>

            <WeeklyProgressBar percentage={0.49} />

            <View
                className="todayStatsContainer"
                style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 6,
                    paddingHorizontal: 32,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: -4,
                    }}
                >
                    <Text
                        style={{
                            lineHeight: 25,
                            height: 25,
                            fontSize: 22,
                            textAlign: "left",
                            fontWeight: "600",
                            color: "#4D4D4D",
                        }}
                    >
                        STATS TODAY
                    </Text>
                </View>
                <TodaysStats
                    activityName="Steps"
                    todaysGoalPercentage={0.7}
                    activityColor="#D9907E"
                    bgColor="#E9D3CC"
                />
                <TodaysStats
                    activityName="Sleep"
                    todaysGoalPercentage={0.62}
                    activityColor="#7ED9B7"
                    bgColor="#D7F3E9"
                />
                <TodaysStats
                    activityName="Screen Time"
                    todaysGoalPercentage={0.9}
                    activityColor="#DAD083"
                    bgColor="#EAE8D2"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: "80%",
        height: "50%",
        backgroundColor: "#FDFDFD",
        borderRadius: 6,
        padding: 20,
        alignItems: "center",
        position: "relative",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    modalIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#16A150",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    boldText: {
        fontWeight: "bold",
    },
    modalButton: {
        backgroundColor: "#16A150",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    modalButtonText: {
        color: "#ffffff",
        fontWeight: "600",
    },
    modalCloseButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    modalCloseButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4D4D4D",
    },
});
