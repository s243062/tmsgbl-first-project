import TodaysStats from "@/components/TodaysStats";
import { useState } from "react";
import { Image, ScrollView, TouchableHighlight, View } from "react-native";
import { Text } from "react-native-paper";

const sproutyImages = [
    require("@/assets/images/sprouty/sprouty1.png"),
    require("@/assets/images/sprouty/sprouty2.png"),
    require("@/assets/images/sprouty/sprouty3.png"),
    require("@/assets/images/sprouty/sprouty4.png"),
];

export default function SproutyHome() {
    const [currentSprouty, setCurrentSprouty] = useState(1);

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
            <View
                className="SproutyTabHeader"
                style={{
                    width: "100%",
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 40,
                    paddingTop: 60,
                    paddingHorizontal: 32,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        position: "absolute",
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
                            fontWeight: "light",
                        }}
                    >
                        Sprouty
                    </Text>
                </View>

                <View
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => alert("Settings clicked!")}
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

            <View
                style={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 32,
                    paddingTop: 10,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
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
                            marginBottom: 16,
                        }}
                    >
                        STATS TODAY:
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: 5,
                    }}
                >
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => alert("Edit clicked!")}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textDecorationLine: "underline",
                                color: "#009C41",
                            }}
                        >
                            Edit
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>

            <View
                className="todayStatsContainer"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 22,
                    paddingHorizontal: 32,
                }}
            >
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
