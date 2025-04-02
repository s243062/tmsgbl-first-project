import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import sleepData from '../assets/sleepDataNew.json';

export default function VegaLiteInteractiveChart() {
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
            <input type="radio" name="timeUnit" value="yearweek" />
            Week
          </label>
          <label>
            <input type="radio" name="timeUnit" value="yearmonth" checked />
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
        const data = ${JSON.stringify(sleepData)};
        
        // Function to create and render the chart
        function renderChart(timeUnit) {
          const timeUnitDisplayMap = {
            'yeardatemonth': 'Date',
            'yearweek': 'Week',
            'yearmonth': 'Month',
            'year': 'Year'
          };
          
          const displayName = timeUnitDisplayMap[timeUnit] || timeUnit;
          
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
                "title": displayName
              },
              "y": {
                "field": "sleepHours",
                "type": "quantitative",
                "aggregate": "sum",
                "title": "Hours Slept"
              },
              "tooltip": [
                { "field": "Date", "type": "temporal", "timeUnit": timeUnit },
                { "field": "sleepHours", "type": "quantitative", "aggregate": "sum", "title": "Sleep Hours" }
              ]
            },
            "width": "container",
            "height": 300,
            "title": {
              "text": "Total Hours Slept per " + displayName,
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
        renderChart('yearmonth');

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
        onError={(e) => console.error('WebView error:', e.nativeEvent)}
        onHttpError={(e) => console.error('WebView HTTP error:', e.nativeEvent)}
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