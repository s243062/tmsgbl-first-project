import MetricComparisonBox from "@/components/MetricComparisonBox";
import MetricSummaryBox from "@/components/MetricSummaryBox";
import { ScrollView, Text, View } from "react-native";

export default function Progress() {
    return (
        <ScrollView
            className="ProgressTabContainer"
            contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
            style={{ backgroundColor: "#ffffff", paddingHorizontal: 22 }}
        >
            <View
                className="ProgressTabTitle"
                style={{
                    paddingTop: 50,
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginBottom: 29,
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: 300,
                    }}
                >
                    Sprouty Progress
                </Text>
            </View>

            <MetricComparisonBox
                comparisonsName="Sprouty"
                navigateTo="/sproutyView"
                bgColor="#F8F8EF"
                activityColor="#D7C115"
            />

            <Text
                style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "left",
                    fontWeight: "600",
                    color: "#4D4D4D",
                    marginBottom: 14,
                    marginTop: 48,
                }}
            >
                Weekly Average
            </Text>
            <View
                className="weeklyAverageContainer"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 22,
                }}
            >
                <MetricSummaryBox
                    activityName="Steps"
                    navigateTo="/stepsView"
                />
                <MetricSummaryBox
                    activityName="Sleep"
                    bgColor="#E1EEF7"
                    activityColor="#0065B1"
                    navigateTo="/sleepView"
                />
                <MetricSummaryBox
                    activityName="Screen Time"
                    bgColor="#F0E4F8"
                    activityColor="#7000B1"
                    navigateTo="/screenTimeView"
                />
            </View>
        </ScrollView>
    );
}
