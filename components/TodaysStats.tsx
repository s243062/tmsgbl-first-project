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

    // Define a mapping of activity names to their current and goal values
    const activityValues: Record<
        TodaysStatsProps["activityName"],
        { currentValue: string; goalValue: string }
    > = {
        Steps: { currentValue: "6 370", goalValue: "10 000" },
        Sleep: { currentValue: "7h 30 min", goalValue: "8h" },
        "Screen Time": { currentValue: "2h 30 min", goalValue: "3h" },
    };

    // Get the current and goal values for the given activityName
    const { currentValue, goalValue } = activityValues[activityName];
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
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
                    <Text style={{ fontWeight: "semibold", fontSize: 14 }}>
                        {currentValue}
                    </Text>
                </View>
                <Text
                    style={{
                        fontWeight: "semibold",
                        fontSize: 14,
                        paddingRight: 12,
                        color: "#7B7B7B",
                    }}
                >
                    {goalValue}
                </Text>
            </View>
        </View>
    );
}
