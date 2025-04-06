// import VegaChart from '@/components/VegaLiteChart';
// import VegaChartScreen from '@/components/VegaLiteChart_ScreenTime';
// import VegaChartSleep from '@/components/VegaLiteChart_Sleep';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function MilaPlayground() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to Mila Playground!</Text>

//       {/* Vega-Lite Chart */}
//       <VegaChart />
//       <VegaChartSleep />

//     </View>
//     {/* Separate container for Screen Time Chart */}
//     <View style={styles.screenTimeContainer}>
//     <Text style={styles.screenTimeTitle}>Screen Time Chart</Text>
//     <VegaChartScreen />
//   </View>
// </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20, // Optional: adds some space between text and chart
//   },
// });

import VegaChart from "@/components/VegaLiteChart";
import VegaChartScreen from "@/components/VegaLiteChart_ScreenTime";
import VegaChartSleep from "@/components/VegaLiteChart_Sleep";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MilaPlayground() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Mila Playground!</Text>

            {/* Vega-Lite Charts (General Charts) */}
            <View style={styles.chartContainer}>
                <VegaChart />
                <VegaChartSleep />
                <VegaChartScreen />
            </View>

            {/* Separate container for Screen Time Chart
      <View style={styles.screenTimeContainer}>
        <Text style={styles.screenTimeTitle}>Screen Time Chart</Text>
        <VegaChartScreen />
      </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    chartContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, // Adds some space between the general charts and screen time chart
    },
    screenTimeContainer: {
        width: "100%",
        backgroundColor: "#e0f7fa", // Optional: adds a background color to the container
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 4 },
        marginTop: 20,
    },
    screenTimeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#00796b",
        marginBottom: 10,
    },
});
