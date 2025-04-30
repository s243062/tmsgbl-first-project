import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import slicedData from '../assets/slicedData.json'; // Your sleep data

export default function VegaLiteInteractiveChart() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const chartHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.jsdelivr.net/npm/vega@5.25.0"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.16.0"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.22.2"></script>
      <style>
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
          background: #fff;
          padding: 12px;
        }
        .chart-container {
          width: 100%;
          overflow-x: auto;
        }
        p.average-label {
          font-size: 1.2em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 12px;
        }
      </style>
    </head>
    <body>
      <p class="average-label" id="averageLabel"></p>
      <div id="chart" class="chart-container"></div>

      <script>
        const slicedData = ${JSON.stringify(slicedData)};
        
        // Generate the chart
        function renderChart() {
          // Get latest date from data
          const latestDate = new Date(Math.max(...slicedData.map(d => new Date(d.date))));
          const startDate = new Date(latestDate);
          const endOfWeek = new Date(latestDate);
          const dayOfWeek = latestDate.getDay(); // 0 = Sunday
          
          // Adjust to upcoming Sunday if needed
          if (dayOfWeek !== 0) {
            endOfWeek.setDate(latestDate.getDate() + (7 - dayOfWeek));
          }
          
          startDate.setDate(endOfWeek.getDate() - 6); // Monday
          
          // Generate full week: Mon to Sun
          const fullWeek = [];
          const tempDate = new Date(startDate);
          
          for (let i = 0; i < 7; i++) {
            fullWeek.push({
              date: new Date(tempDate),
              day: tempDate.toLocaleDateString('en-US', { weekday: 'short' }), // 'Mon', 'Tue', etc.
              minutes: 0
            });
            tempDate.setDate(tempDate.getDate() + 1);
          }
          
          // Merge real data
          slicedData.forEach(d => {
            const dDate = new Date(d.date);
            const index = fullWeek.findIndex(w => 
              w.date.toDateString() === dDate.toDateString()
            );
            if (index !== -1) fullWeek[index].minutes = d.minutes;
          });
          
          // Calculate average minutes per day
          const totalMinutes = fullWeek.reduce((sum, d) => sum + d.minutes, 0);
          const daysWithData = fullWeek.filter(d => d.minutes > 0).length;
          const avgMinutes = daysWithData > 0 ? totalMinutes / daysWithData : 0;
          
          // Update the average label
          document.getElementById("averageLabel").textContent = 
            \`Average per Day: \${Math.round(avgMinutes)} minutes\`;
            
          // Determine a good y-axis scale that includes both the data and goal
          const maxMinutes = Math.max(...fullWeek.map(d => d.minutes));
          const yDomainMax = Math.max(maxMinutes, 60) * 1.1;
          
          // Create Vega-Lite specification for the combined chart
          const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container",
            "height": 300,
            "title": \`(\${startDate.toLocaleDateString()} – 09/04/2025)\`,
            "layer": [
              {
                "data": { "values": fullWeek },
                "mark": { "type": "bar", "fill": "#4c78a8" },
                "encoding": {
                  "x": { 
                    "field": "day", 
                    "type": "ordinal", 
                    "sort": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    "axis": {
                      "labelAngle": 0,
                      "title": null,
                      "labelExpr": "datum.value === 'Wed' ? '-->' + datum.value + '<--' : datum.value"
                    }
                  },
                  "y": { 
                    "field": "minutes", 
                    "type": "quantitative",
                    "scale": { "domain": [0, yDomainMax], "nice": true },
                    "axis": { "grid": false, "tickCount": 3 },
                    "title": "Minutes"
                  }
                }
              },
              {
                "data": { "values": [{ "value": 60, "Legend": "Daily Maximum" }] },
                "mark": { "type": "rule", "stroke": "red", "strokeWidth": 2 },
                "encoding": {
                  "y": { "field": "value", "type": "quantitative", "title": null },
                  "color": {
                    "field": "Legend", 
                    "type": "nominal",
                    "scale": { "range": ["red"] },
                    "legend": { "title": null, "orient": "bottom" }
                  }
                }
              }
            ]
          };
          
          vegaEmbed('#chart', spec, { actions: false }).catch(console.error);
        }

        // Initial render
        renderChart();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: chartHtml }}
        style={[styles.webview, { width: screenWidth - 20, height: screenHeight * 0.75 }]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    borderRadius: 12,
    overflow: 'hidden',
  }
});