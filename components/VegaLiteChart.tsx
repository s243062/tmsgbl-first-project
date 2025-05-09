

import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import dataSteps from '../assets/dataSteps.json';

export default function VegaLiteInteractiveChart() {
  const [timeUnit, setTimeUnit] = useState('month');

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
          padding: 10px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        #controls {
          margin-bottom: 10px;
          width: 100%;
          max-width: 600px;
          display: flex;
          justify-content: center;
        }
        .radio-group {
          display: flex;
          gap: 10px;
        }
        .radio-group label {
          display: flex;
          align-items: center;
        }
        .radio-group input {
          margin-right: 5px;
        }
        #vis {
          width: 100%;
          max-width: 600px;
        }
      </style>
    </head>
    <body>
      <div id="controls">
        <div class="radio-group">
          <label>
            <input type="radio" name="timeUnit" value="yeardatemonth" />
            Date
          </label>
          <label>
            <input type="radio" name="timeUnit" value="week" />
            Week
          </label>
          <label>
            <input type="radio" name="timeUnit" value="month" checked />
            Month
          </label>
          
          <label>
            <input type="radio" name="timeUnit" value="year" />
            Year
          </label>
        </div>
      </div>
      <div id="vis"></div>
      <script>
        const data = ${JSON.stringify(dataSteps)};

        // Function to create and render the chart
        function renderChart(timeUnit) {
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
                "field": "Date",
                "type": "temporal",
                "timeUnit": timeUnit,
                "title": timeUnit === 'yearmonth' ? '6 Months' : timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)
              },
              "y": {
                "field": "Steps",
                "type": "quantitative",
                "aggregate": "sum",
                "title": "Total Steps"
              },
              "tooltip": [
                { "field": "Date", "type": "temporal" },
                { "field": "Steps", "type": "quantitative", "aggregate": "sum" }
              ]
            },
            "width": "container",
            "height": 300,
            "title": {
              "text": \`Total Steps per \${timeUnit === 'yearmonth' ? '6 Months' : timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}\`,
              "fontSize": 18,
              "font": "Arial",
              "color": "#333"
            }
          };

          vegaEmbed('#vis', spec, {
            actions: false
          }).catch(console.error);
        }

        // Initial render
        renderChart('month');

        // Add event listeners to radio buttons
        document.querySelectorAll('input[name="timeUnit"]').forEach(radio => {
          radio.addEventListener('change', function(e) {
            renderChart(e.target.value);
          });
        });
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
    height: 400,
  }
});