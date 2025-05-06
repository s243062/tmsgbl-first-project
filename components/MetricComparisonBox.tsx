import { useRouter } from "expo-router";
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";

type ValidRoute =
    | "/stepsView"
    | "/sleepView"
    | "/screenTimeView"
    | "/sproutyView";
interface MetricComparisonBoxProps {
    bgColor?: string;
    activityColor?: string;
    comparisonsName: string;
    navigateTo?: ValidRoute;
}

export default function MetricComparisonBox({
    bgColor = "#E3F4EE",
    activityColor = "#16A150",
    comparisonsName,
    navigateTo,
}: MetricComparisonBoxProps) {
    const router = useRouter();

    const handlePress = () => {
        if (navigateTo) {
            // This works now because `navigateTo` is typed as `ValidRoute`
            router.push(navigateTo); // Expo Router will now accept this type safely
        }
    };

    const rightArrowIcon = require("../assets/images/arrowRightIcon.png");
    const sproutyIconY = require("../assets/images/sproutyIconY.png");
    const sproutyChartMini = require("../assets/images/sproutyChartMini.png");

    return (
        <TouchableHighlight
            onPress={handlePress}
            style={{
                width: "100%",
                height: 143,
            }}
        >
            <View
                className="MetricBox"
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    backgroundColor: bgColor,
                    paddingVertical: 11,
                    paddingHorizontal: 13,

                    borderRadius: 6,
                }}
            >
                <View
                    className="MetricBoxTop"
                    style={{
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 9,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={sproutyIconY}
                            style={[
                                {
                                    width: 25,
                                    height: 25,
                                    //resizeMode: "contain",
                                },
                                { resizeMode: "contain" },
                            ]}
                        />
                        <Text
                            style={{
                                lineHeight: 25,
                                height: 25,
                                fontSize: 19,
                                fontWeight: "regular",
                                textAlign: "left",
                                color: activityColor,
                            }}
                        >
                            {comparisonsName}
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
                        <Image
                            source={rightArrowIcon}
                            style={[
                                {
                                    width: 16,
                                    height: 16,
                                    //resizeMode: "contain",
                                },
                                { resizeMode: "contain" },
                            ]}
                        />
                    </View>
                </View>
                <View
                    className="MetricBoxBottom"
                    style={{
                        flex: 2,
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "regular",
                            textAlign: "left",
                        }}
                    >
                        <Text style={styles.number}>17/21</Text>
                        <Text style={styles.unit}>weekly goals</Text>
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={sproutyChartMini}
                            style={[
                                {
                                    width: 118,
                                    marginBottom: 4,

                                    //resizeMode: "contain",
                                },
                                { resizeMode: "contain" },
                            ]}
                        />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    number: {
        fontSize: 30,
        color: "#4D4D4D",
    },
    unit: {
        fontSize: 16,
        color: "#7B7B7B",
        fontWeight: 400,
        marginLeft: 2,
        marginRight: 3,
    },
});
