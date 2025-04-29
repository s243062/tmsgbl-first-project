import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";

// mertic: name, type?, data??(or import here)--> weekly average, stats from last week
// icons & colors depending on metric name/type

type ActivityIcons = {
    activityIcon: any;
    chartIcon: any;
};
const activityIcons: Record<string, ActivityIcons> = {
    steps: {
        activityIcon: require("../assets/images/stepsIcon.png"),
        chartIcon: require("../assets/images/stepsChartIcon.png"),
    },
    sleep: {
        activityIcon: require("../assets/images/sleepIcon.png"),
        chartIcon: require("../assets/images/sleepChartIcon.png"),
    },
    screenTime: {
        activityIcon: require("../assets/images/screenTimeIcon.png"),
        chartIcon: require("../assets/images/screenChartIcon.png"),
    },
};

interface MetricSummaryBoxProps {
    bgColor?: string;
    activityColor?: string;
    activityName: string;
}

export default function MetricSummaryBox({
    bgColor = "#E3F4EE",
    activityColor = "#16A150",
    activityName,
}: MetricSummaryBoxProps) {
    const rightArrowIcon = require("../assets/images/arrowRightIcon.png");

    const iconKey =
        activityName.charAt(0).toLowerCase() +
        activityName.slice(1).replace(/\s+/g, ""); // "steps", "screenTime", etc.

    const [weeklyAverage, setWeeklyAverage] = useState([
        { activity: "Steps", count: "6340" },
        { activity: "Sleep", count: "7 20" },
        { activity: "Screen Time", count: "4 20" },
    ]);

    const activityData = weeklyAverage.find(
        (item) => item.activity === activityName
    );

    // Function to format count based on activity
    const formatCount = (activity: string, count: string) => {
        if (activity === "Steps") {
            return (
                <>
                    <Text style={styles.number}>{count}</Text>
                    <Text style={styles.unit}> steps</Text>
                </>
            );
        } else if (activity === "Sleep" || activity === "Screen Time") {
            const [hours, minutes] = count.split(" ");
            return (
                <>
                    <Text style={styles.number}>{hours}</Text>
                    <Text style={styles.unit}>h </Text>
                    <Text style={styles.number}>{minutes}</Text>
                    <Text style={styles.unit}>min</Text>
                </>
            );
        } else {
            return <Text>{count}</Text>;
        }
    };

    return (
        <TouchableHighlight
            style={{
                width: "100%",
                //flex: 2,
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
                            gap: 7,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={activityIcons[iconKey]?.activityIcon}
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
                                fontSize: 20,
                                fontWeight: "regular",
                                textAlign: "left",
                                color: activityColor,
                            }}
                        >
                            {activityName}
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
                        {activityData
                            ? formatCount(activityName, activityData.count)
                            : "No data available"}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image
                            source={activityIcons[iconKey]?.chartIcon}
                            style={[
                                {
                                    width: 90,
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
