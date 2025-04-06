import { Image, Text, TouchableHighlight, View } from "react-native";

interface MetricComparisonBoxProps {
    bgColor?: string;
    activityColor?: string;
    comparisonsName: string;
}

export default function MetricComparisonBox({
    bgColor = "#E3F4EE",
    activityColor = "#16A150",
    comparisonsName,
}: MetricComparisonBoxProps) {
    const rightArrowIcon = require("../assets/images/arrowRightIcon.png");
    const comparisonIcon = require("../assets/images/comparisonIcon.png");
    const comparisonChartMini = require("../assets/images/comparisonChartMini.png");

    return (
        <TouchableHighlight
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
                            source={comparisonIcon}
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
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={rightArrowIcon}
                            style={[
                                {
                                    width: 14,
                                    height: 14,
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
                        alignItems: "flex-end",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={comparisonChartMini}
                            style={[
                                {
                                    width: 263,
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
