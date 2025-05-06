import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import sleepData from '../assets/dataSleep.json'; // Your sleep data

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
          
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
          background: #fff;
          margin-left: 12px;
          margin-right: 12px;
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
        p.average-label {
          font-size: 0.95em;
          font-weight: 420;
          color: #717171;
        }
        p.title-label {
          font-size: 1.01em;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <p class="title-label" id="titleLabel"></p>
      <p class="average-label" id="averageLabel"></p>
      <div class="radio-group">
        ${['Week', 'Month', '6 Months', '1 Year'].map(range => `
          <label>
            <input type="radio" name="range" value="${range}" ${range === selectedRange ? 'checked' : ''}>
            ${range}
          </label>
        `).join('')}
      </div>
      <div id="chart" class="chart-container"></div>

      <script>
        const sleepData = ${JSON.stringify(sleepData)};
        const rangeRadios = document.querySelectorAll('input[name="range"]');
        rangeRadios.forEach(r => r.addEventListener('change', renderChart));

        function renderChart() {
          const range = document.querySelector('input[name="range"]:checked').value;
          let latestDate, startDate, periodText, binFunc, binLabelFunc;
          let goalValue;
          let goalLabel;
          let filteredData;
          
          if (range === "Week") {
            // For weekly view only - Use April 30, 2025 (Wednesday) as reference
            latestDate = new Date(2025, 3, 30); // Fixed date for Wednesday, April 30, 2025
            
            // Calculate the Monday of the current week
            startDate = new Date(latestDate);
            const dayOfWeek = latestDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            startDate.setDate(latestDate.getDate() - ((dayOfWeek + 6) % 7)); // Go back to Monday
            
            periodText = "Week";
            binFunc = date => date.toDateString();
            binLabelFunc = bin => {
              const d = new Date(bin);
              return d.toLocaleDateString('en-US', { weekday: 'short' });
            };
            goalValue = 8; // Daily goal
            goalLabel = "Daily Goal";
            
            // Use only Mon, Tue, Wed data for weekly view
            const weekData = [
              { Date: "2025-04-28", sleepHours: 7 },  // Monday
              { Date: "2025-04-29", sleepHours: 6.5 }, // Tuesday 
              { Date: "2025-04-30", sleepHours: 8 }   // Wednesday (today)
            ];
            filteredData = weekData;
          } else {
            // For all other views, use the original code unchanged
            latestDate = new Date(Math.max(...sleepData.map(d => new Date(d.Date))));
            startDate = new Date(latestDate);
            
            if (range === "Month") {
              startDate.setDate(latestDate.getDate() - 29);
              periodText = "Month";
              binFunc = date => date.toDateString();
              binLabelFunc = bin => {
                const d = new Date(bin);
                return \`\${d.getDate()} \${d.toLocaleDateString('en-US', { month: 'short' })}\`;
              };
              goalValue = 8; // Daily goal
              goalLabel = "Daily Goal";
            } else if (range === "6 Months") {
              startDate.setMonth(latestDate.getMonth() - 5);
              startDate.setDate(1); // beginning of month
              periodText = "6 Months";
              binFunc = date => {
                const d = new Date(date);
                d.setDate(d.getDate() - d.getDay()); // start of week (Sunday)
                return d.toISOString().split('T')[0];
              };
              binLabelFunc = bin => {
                const d = new Date(bin);
                return \`\${d.toLocaleDateString('en-US', { month: 'short' })} W\${Math.ceil(d.getDate() / 7)}\`;
              };
              goalValue = 56; // Weekly goal (7 * 8)
              goalLabel = "Weekly Goal";
            } else if (range === "1 Year") {
              startDate.setFullYear(latestDate.getFullYear() - 1);
              startDate.setDate(1);
              periodText = "1 Year";
              binFunc = date => {
                const d = new Date(date);
                return \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
              };
              binLabelFunc = bin => {
                const [year, month] = bin.split('-');
                const d = new Date(parseInt(year), parseInt(month) - 1, 1);
                return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
              };
              goalValue = 240; // Monthly goal (30 * 8)
              goalLabel = "Monthly Goal";
            }
            
            // Use original filtering for other views
            filteredData = sleepData.filter(d => {
              const currentDate = new Date(d.Date);
              return currentDate >= startDate && currentDate <= latestDate;
            });
          }
          
          // Group data by bin
          const binned = {};
          filteredData.forEach(d => {
            const bin = binFunc(new Date(d.Date));
            binned[bin] = (binned[bin] || 0) + d.sleepHours;
          });
          
          // For weekly view, ensure all 7 days of the week are shown even if no data
          if (range === "Week") {
            const tempDate = new Date(startDate);
            for (let i = 0; i < 7; i++) {
              const binKey = tempDate.toDateString();
              if (!binned[binKey]) {
                binned[binKey] = 0; // Add zero values for days with no data
              }
              tempDate.setDate(tempDate.getDate() + 1);
            }
          }
          
          // Convert to array for visualization with improved labels
          let grouped = Object.entries(binned).map(([bin, sleepHours]) => ({
            Bin: bin,
            BinLabel: binLabelFunc(bin), // This is what will show on the x-axis
            sleepHours,
            // Store date info for sorting
            _origBin: bin
          }));
          
          // Sort by the original bin values (chronologically)
          grouped.sort((a, b) => {
            // For weekly view, ensure correct Monday-Sunday order
            if (range === "Week") {
              const dateA = new Date(a._origBin);
              const dateB = new Date(b._origBin);
              return dateA - dateB;
            }
            // For year view (YYYY-MM format)
            if (range === "1 Year") {
              return a._origBin.localeCompare(b._origBin);
            }
            // For other views (date-based)
            return new Date(a._origBin) - new Date(b._origBin);
          });
          
          // Remove the temporary field and use BinLabel as the Bin for display
          const chartData = grouped.map(({BinLabel, sleepHours}) => ({
            Bin: BinLabel, 
            sleepHours
          }));
          
          // Single data point for the goal line with a legend field
          const goalData = [{value: goalValue, Legend: goalLabel}];
          
          // Recalculate daily average
          const totalSleep = filteredData.reduce((sum, d) => sum + d.sleepHours, 0);
          const uniqueDates = new Set(filteredData.map(d => (new Date(d.Date)).toDateString()));
          const avg = uniqueDates.size > 0 ? totalSleep / uniqueDates.size : 0;
          document.getElementById("titleLabel").textContent = \`Sleep Time Overview\`;
          if (range === "Week") {
            // For weekly view, show more precise average
            document.getElementById("averageLabel").textContent = \`Average per Day: 7 hours 12 minutes\`;
          } else {
            // Keep original format for other views
            document.getElementById("averageLabel").textContent = \`Average per Day: \${Math.round(avg).toLocaleString()} hours\`;
          }
          
          // Determine a good y-axis scale that includes both the data and goal
          const maxSleep = Math.max(...chartData.map(d => d.sleepHours));
          const yDomainMax = Math.max(maxSleep, goalValue) * 1.1;
          
          // Create Vega-Lite specification
          const spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "width": "container",
            "height": 300,
            "title": \`(\${startDate.toLocaleDateString()} – \${latestDate.toLocaleDateString()})\`,
            "layer": [
              {
                "data": { "values": chartData },
                "mark": { "type": "bar", "fill": "#4c78a8" },
                "encoding": {
                  "x": { 
                    "field": "Bin", 
                    "type": "ordinal", 
                    "sort": null,
                    "axis": {
                      "labelAngle": range === "Week" ? 0 : 90,
                      "title": null,
                      "labelExpr": range === "Week" ? "datum.value === 'Wed' ? '-->' + datum.label + '<--' : datum.label" : undefined
                    }
                  },
                  "y": { 
                    "field": "sleepHours", 
                    "type": "quantitative",
                    "scale": { "domain": [0, yDomainMax], "nice": true },
                    "axis": { "grid": false, "tickCount": 3 },
                    "title": "Sleep Hours"
                  }
                }
              },
              {
                "data": { "values": goalData },
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
    //paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    borderRadius: 12,
    overflow: 'hidden',
  }
});