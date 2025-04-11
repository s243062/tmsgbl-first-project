import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import dataSteps from '../assets/dataSteps.json';

export default function VegaLiteInteractiveChart() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [selectedRange, setSelectedRange] = useState('Week');

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
        .radio-group {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .radio-group label {
          font-size: 14px;
          margin-right: 12px;
        }
        .chart-container {
          width: 100%;
          overflow-x: auto;
        }
      </style>
    </head>
    <body>
      <div class="radio-group">
        ${['Week', 'Month', '6 Months', '1 Year'].map(range => `
          <label>
            <input type="radio" name="range" value="${range}" ${range === selectedRange ? 'checked' : ''}>
            ${range}
          </label>
        `).join('')}
      </div>
      <div id="averageLabel" style="font-weight: bold; margin-bottom: 12px;"></div>
      <div id="chart" class="chart-container"></div>

      <script>
        const dataSteps = ${JSON.stringify(dataSteps)};
        const rangeRadios = document.querySelectorAll('input[name="range"]');
        rangeRadios.forEach(r => r.addEventListener('change', renderChart));

        function renderChart() {
          const range = document.querySelector('input[name="range"]:checked').value;
          const latestDate = new Date(Math.max(...dataSteps.map(d => new Date(d.Date))));
          const startDate = new Date(latestDate);
          let binFunc, binLabelFunc, goalValue, periodText;

          if (range === "Week") {
            startDate.setDate(latestDate.getDate() - 6);
            periodText = "Week";
            binFunc = d => new Date(d).toDateString();
            binLabelFunc = bin => new Date(bin).toLocaleDateString('en-US', { weekday: 'short' });
            goalValue = 10000;
          } else if (range === "Month") {
            startDate.setDate(latestDate.getDate() - 29);
            periodText = "Month";
            binFunc = d => new Date(d).toDateString();
            binLabelFunc = bin => {
              const date = new Date(bin);
              return \`\${date.getDate()} \${date.toLocaleDateString('en-US', { month: 'short' })}\`;
            };
            goalValue = 10000;
          } else if (range === "6 Months") {
            startDate.setMonth(latestDate.getMonth() - 5);
            startDate.setDate(1);
            periodText = "6 Months";
            binFunc = d => {
              const date = new Date(d);
              date.setDate(date.getDate() - date.getDay());
              return date.toISOString().split('T')[0];
            };
            binLabelFunc = bin => {
              const date = new Date(bin);
              return \`\${date.toLocaleDateString('en-US', { month: 'short' })} W\${Math.ceil(date.getDate() / 7)}\`;
            };
            goalValue = 70000;
          } else {
            startDate.setFullYear(latestDate.getFullYear() - 1);
            startDate.setDate(1);
            periodText = "1 Year";
            binFunc = d => {
              const date = new Date(d);
              return \`\${date.getFullYear()}-\${String(date.getMonth() + 1).padStart(2, '0')}\`;
            };
            binLabelFunc = bin => {
              const [year, month] = bin.split('-');
              return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            };
            goalValue = 300000;
          }

          const filtered = dataSteps.filter(d => {
            const date = new Date(d.Date);
            return date >= startDate && date <= latestDate;
          });

          const binned = {};
          filtered.forEach(d => {
            const bin = binFunc(d.Date);
            binned[bin] = (binned[bin] || 0) + d.Steps;
          });

          const chartData = Object.entries(binned).map(([bin, Steps]) => ({
            Bin: binLabelFunc(bin),
            Steps
          }));

          const goalLine = [{ value: goalValue }];
          const totalSteps = filtered.reduce((sum, d) => sum + d.Steps, 0);
          const uniqueDates = new Set(filtered.map(d => new Date(d.Date).toDateString()));
          const avg = uniqueDates.size > 0 ? totalSteps / uniqueDates.size : 0;

          document.getElementById("averageLabel").textContent = \`Daily Average: \${Math.round(avg).toLocaleString()} steps\`;

          const chartSpec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container",
            "height": 300,
            "layer": [
              {
                "data": { "values": chartData },
                "mark": "bar",
                "encoding": {
                  "x": { "field": "Bin", "type": "ordinal", "title": "Period" },
                  "y": { "field": "Steps", "type": "quantitative", "title": "Total Steps" }
                }
              },
              {
                "data": { "values": goalLine },
                "mark": { "type": "rule", "color": "red", "strokeWidth": 2 },
                "encoding": {
                  "y": { "field": "value", "type": "quantitative" }
                }
              }
            ],
            "title": \`Steps for the Past \${periodText} (\${startDate.toLocaleDateString()} – \${latestDate.toLocaleDateString()})\`
          };

          vegaEmbed('#chart', chartSpec, { actions: false }).catch(console.error);
        }

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
