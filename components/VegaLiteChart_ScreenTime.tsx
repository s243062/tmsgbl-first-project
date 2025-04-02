// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import screenData from '../assets/screenTime.json';

// export default function VegaLiteInteractiveChart() {
//   const screenWidth = Dimensions.get('window').width;

//   const chartHtml = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <script src="https://cdn.jsdelivr.net/npm/vega@5.25.0"></script>
//       <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.16.0"></script>
//       <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.22.2"></script>
//       <style>
//         body, html {
//           margin: 0;
//           padding: 10px;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           font-family: Arial, sans-serif;
//         }
//         #controls {
//           margin-bottom: 10px;
//           width: 100%;
//           max-width: 600px;
//           display: flex;
//           justify-content: center;
//         }
        
        
//         #vis {
//           width: 100%;
//           max-width: 600px;
//         }
//       </style>
//     </head>
//     <body>
     
//       <div id="vis"></div>
//       <script>
//         const data = ${JSON.stringify(screenData)};
        
//         // Function to create and render the chart
//         function renderChart() {
//           const timeUnitDisplayMap = {
//             'yeardatemonth': 'Date',
            
//           };
          
         
          
//           const spec = {
//             "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//             "data": { "values": data },
//             "mark": {
//               "type": "bar",
//               "color": "#4FACFE",
//               "cornerRadiusTopLeft": 4,
//               "cornerRadiusTopRight": 4
//             },
//             "encoding": {
//               "x": {
//                 "field": "date",
//                 "type": "temporal",
//                 "title": "Date",
//                 "scale": {"type": "band", "paddingInner": 0.1, "paddingOuter": 0.1}
//                 },
//               "y": {
//                 "field": "minutes",
//                 "type": "quantitative",
//                 "title": "Minutes"
//               },
//               "tooltip": [
//                 { "field": "date", "type": "temporal" },
//                 { "field": "minutes", "type": "quantitative", "aggregate": "sum"}
//               ]
//             },
//             "width": "container",
//             "height": 300,
//             "title": {
//               "text": "Screen Time ",
//               "fontSize": 18,
//               "font": "Arial",
//               "color": "#333"
//             }
//           };

//           vegaEmbed('#vis', spec, {
//             actions: false
//           }).catch(console.error);
//         }

//         // Initial render
//         renderChart();

        
//       </script>
//     </body>
//     </html>
//   `;

//   return (
//     <View style={styles.container}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html: chartHtml }}
//         style={[styles.webview, { width: screenWidth }]}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         startInLoadingState={true}
//         scalesPageToFit={true}
//         onError={(e) => console.error('WebView error:', e.nativeEvent)}
//         onHttpError={(e) => console.error('WebView HTTP error:', e.nativeEvent)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   webview: {
//     height: 400,
//   }
// });


import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import daily_array from '../assets/screenTime.json';

export default function VegaLiteChart() {
  const screenWidth = Dimensions.get('window').width;

  const chartHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/vega@5.25.0"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.16.0"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.22.2"></script>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          font-family: Arial, sans-serif;
        }
        #vis {
          width: 100%;
          max-width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="vis"></div>
      <script>
        const data = ${JSON.stringify(daily_array)};
        
        const spec = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "data": { "values": data },
          "mark": {
            "type": "bar",
            "color": "#4FACFE",
            "cornerRadiusTopLeft": 4,
            "cornerRadiusTopRight": 4
          },
          "encoding": {
            "x": {
              "field": "date",
              "type": "temporal",
              "timeUnit": "yearmonthdate",
              "title": "Date",
              "scale": {"type": "band", "paddingInner": 0.1, "paddingOuter": 0.1}
            },
            "y": {
              "field": "minutes",
              "type": "quantitative",
              "aggregate": "sum",
              "title": "Minutes"
            },
            "tooltip": [
              {"field": "date", "type": "temporal"},
              {"field": "minutes", "type": "quantitative", "aggregate": "sum"}
            ]
          },
          "width": "container",
          "height": 300,
          "title": {
            "text": "Screen Time in March",
            "fontSize": 18,
            "font": "Arial",
            "color": "#333"
          }
        };

        vegaEmbed('#vis', spec, {
          actions: false
        }).catch(console.error);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: chartHtml }}
        style={[styles.webview, { width: screenWidth }]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        onError={(e) => console.error('WebView error:', e.nativeEvent)}
        onHttpError={(e) => console.error('WebView HTTP error:', e.nativeEvent)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    height: 400,
  }
});