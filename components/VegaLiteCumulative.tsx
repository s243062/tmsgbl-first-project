import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import dataSteps from '../assets/dataSteps.json';

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
          padding: 10px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen;
          background: #fff;
        }
        .container {
          max-width: 100%;
          width: 100%;
          margin: auto;
        }
        .stats-box {
          margin-bottom: 12px;
          padding: 12px 14px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          font-size: 14px;
        }
        .stats-box div {
          margin-bottom: 4px;
        }
        .chart {
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div id="stats" class="stats-box"></div>
        <div id="vis" class="chart"></div>
      </div>

      <script>
        const data = ${JSON.stringify(dataSteps)};

        const latestDate = new Date(Math.max(...data.map(d => new Date(d.Date))));

        const getStartOfWeek = (date) => {
          const d = new Date(date);
          const day = d.getDay();
          return new Date(d.setDate(d.getDate() - day));
        };

        const formatDate = (date) => \`\${date.getMonth() + 1}/\${date.getDate()}\`;

        const currentWeekStart = getStartOfWeek(latestDate);
        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(previousWeekStart);
        previousWeekEnd.setDate(previousWeekStart.getDate() + 6);

        const currentWeekData = data.filter(d => {
          const date = new Date(d.Date);
          return date >= currentWeekStart && date <= latestDate;
        });

        const previousWeekData = data.filter(d => {
          const date = new Date(d.Date);
          return date >= previousWeekStart && date <= previousWeekEnd;
        });

        const calculateAverage = (arr) => {
          if (arr.length === 0) return 0;
          const total = arr.reduce((acc, val) => acc + val.Steps, 0);
          return Math.round(total / arr.length);
        };

        const previousWeekAvg = calculateAverage(previousWeekData);
        const currentWeekAvg = calculateAverage(currentWeekData);

        let percentDiff = 0;
        let percentText = "";

        if (previousWeekAvg > 0) {
          percentDiff = ((currentWeekAvg - previousWeekAvg) / previousWeekAvg) * 100;
          const isMore = percentDiff > 0;
          percentText = isMore
            ? \`↑ \${Math.abs(percentDiff).toFixed(1)}% more than last week\`
            : \`↓ \${Math.abs(percentDiff).toFixed(1)}% less than last week\`;
        }

        const processAndCumulateData = (data, label) => {
          data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
          let cumulative = 0;
          return data.map(d => {
            const date = new Date(d.Date);
            const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()];
            cumulative += d.Steps;
            return {
              Date: d.Date,
              Steps: d.Steps,
              CumulativeSteps: cumulative,
              DayName: dayName,
              Week: label
            };
          });
        };

        const currentWeekLabel = \`Current Week (\${formatDate(currentWeekStart)} - \${formatDate(latestDate)})\`;
        const previousWeekLabel = \`Previous Week (\${formatDate(previousWeekStart)} - \${formatDate(previousWeekEnd)})\`;

        const currentProcessed = processAndCumulateData(currentWeekData, currentWeekLabel);
        const previousProcessed = processAndCumulateData(previousWeekData, previousWeekLabel);

        const spec = {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "width": "container",
          "height": 320,
          "title": "Cumulative Weekly Steps Comparison",
          "layer": [
            {
              "data": { "values": previousProcessed },
              "mark": { "type": "line", "color": "#A0A0A0", "strokeWidth": 2 },
              "encoding": {
                "x": {
                  "field": "DayName", "type": "ordinal",
                  "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "title": "Day"
                },
                "y": {
                  "field": "CumulativeSteps", "type": "quantitative",
                  "title": "Cumulative Steps"
                },
                "tooltip": [
                  { "field": "DayName", "type": "nominal", "title": "Day" },
                  { "field": "CumulativeSteps", "type": "quantitative" }
                ]
              }
            },
            {
              "data": { "values": currentProcessed },
              "mark": { "type": "line", "color": "#1E90FF", "strokeWidth": 2 },
              "encoding": {
                "x": {
                  "field": "DayName", "type": "ordinal",
                  "sort": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "title": "Day"
                },
                "y": {
                  "field": "CumulativeSteps", "type": "quantitative",
                  "title": "Cumulative Steps",
                  "axis": { "grid": false }
                },
                "tooltip": [
                  { "field": "DayName", "type": "nominal", "title": "Day" },
                  { "field": "CumulativeSteps", "type": "quantitative" }
                ]
              }
            }
          ]
        };

        vegaEmbed('#vis', spec, { actions: false }).then(() => {
          const statsEl = document.getElementById('stats');
          statsEl.innerHTML = \`
            <div style="display: flex; justify-content: space-between;">
              <div style="color: #1E90FF;">Current Avg: \${currentWeekAvg.toLocaleString()} steps</div>
              <div style="color: \${percentDiff > 0 ? '#4CAF50' : '#F44336'};">\${percentText}</div>
            </div>
            <div style="color: #A0A0A0;">Previous Avg: \${previousWeekAvg.toLocaleString()} steps</div>
          \`;
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
        style={[styles.webview, { width: screenWidth, height: screenHeight * 0.6 }]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
  }
});
