import { Text, View } from "react-native";

interface TodaysStatsProps {
    activityName: string;
    todaysGoalPercentage: number;
    activityColor?: string;
    bgColor?: string;
}

export default function TodaysStats({
    activityName,
    todaysGoalPercentage,
    activityColor = "#16A150",

    bgColor = "#E3F4EE",
}: TodaysStatsProps) {
    const todaysGoalPercentageString = `${(todaysGoalPercentage * 100).toFixed(
        2
    )}%` as string;

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
            }}
        >
            <Text
                style={{
                    fontWeight: 300,
                    fontSize: 18,
                    textTransform: "uppercase",
                }}
            >
                {activityName.replace(/\s+/g, "")}:
            </Text>
            <View
                style={{
                    height: 45,
                    backgroundColor: bgColor,
                    paddingHorizontal: 4,
                    borderRadius: 36,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <View
                    style={{
                        height: 36,
                        width: todaysGoalPercentageString,
                        backgroundColor: activityColor,
                        borderRadius: 36,
                        paddingHorizontal: 24,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                        Progress bar placeholder...
                    </Text>
                </View>
            </View>
        </View>
    );
}
