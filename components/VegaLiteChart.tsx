import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import dataSteps from '../assets/dataSteps.json';
//const stepsData = require('../assets/dataSteps.json');

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
        select {
          padding: 5px;
          font-size: 16px;
        }
        #vis {
          width: 100%;
          max-width: 600px;
        }
      </style>
    </head>
    <body>
      <div id="controls">
        <select id="timeUnitSelector">
          <option value="month">Month</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div id="vis"></div>
      <script>
        const data = ${JSON.stringify(dataSteps)};
        
        // Function to create and render the chart
        function renderChart(timeUnit) {
          const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": { "values": data },
            "mark": "bar",
            "encoding": {
              "x": {
                "field": "Date", 
                "type": "temporal", 
                "timeUnit": timeUnit,
                "title": timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)
              },
              "y": {
                "field": "Steps", 
                "type": "quantitative", 
                "aggregate": "sum",
                "title": "Total Steps"
              }
            },
            "width": "container",
            "height": 300,
            "title": \`Total Steps per \${timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}\`
          };

          vegaEmbed('#vis', spec, {
            actions: false
          }).catch(console.error);
        }

        // Initial render
        renderChart('month');

        // Add event listener to selector
        document.getElementById('timeUnitSelector').addEventListener('change', function(e) {
          renderChart(e.target.value);
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
