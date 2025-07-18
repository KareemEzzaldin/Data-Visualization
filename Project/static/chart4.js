document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart4();
});

function fetchDataAndUpdateChart4() {
    fetch('/get-datachart4')
        .then(response => response.json())
        .then(data => {
            updateChart4(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart4(data_4){
    am5.ready(function() {


        // Create root element
        var root = am5.Root.new("chart4div");
        
        
        var myTheme = am5.Theme.new(root);
        
        myTheme.rule("Grid", ["base"]).setAll({
          strokeOpacity: 0.1
        });
        
        
        // Set themes
        root.setThemes([
          am5themes_Animated.new(root),
          myTheme
        ]);
        
        
        // Create chart
        var chart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
            paddingLeft: 0
          })
        );
        
        
        // Create axes
        var yRenderer = am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true
        });
        yRenderer.grid.template.set("location", 1);
        
        var yAxis = chart.yAxes.push(
          am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "class4",
            renderer: yRenderer
          })
        );
        
        var xAxis = chart.xAxes.push(
          am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            renderer: am5xy.AxisRendererX.new(root, {
              visible: true,
              strokeOpacity: 0.1,
              minGridDistance: 80
            })
          })
        );
        
        
        // Create series
        var series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value4",
            sequencedInterpolation: true,
            categoryYField: "class4"
          })
        );
        
        var columnTemplate = series.columns.template;
        
        columnTemplate.setAll({
          draggable: true,
          cursorOverStyle: "pointer",
          tooltipText: "drag to rearrange",
          cornerRadiusBR: 10,
          cornerRadiusTR: 10,
          strokeOpacity: 0
        });
        columnTemplate.adapters.add("fill", (fill, target) => {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        
        columnTemplate.adapters.add("stroke", (stroke, target) => {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
        });
        
        columnTemplate.events.on("dragstop", () => {
          sortCategoryAxis();
        });
        
        // Get series item by category
        function getSeriesItem(category) {
          for (var i = 0; i < series.dataItems.length; i++) {
            var dataItem = series.dataItems[i];
            if (dataItem.get("categoryY") == category) {
              return dataItem;
            }
          }
        }
        
        
        // Axis sorting
        function sortCategoryAxis() {
          // Sort by value
          series.dataItems.sort(function (x, y) {
            return y.get("graphics").y() - x.get("graphics").y();
          });
        
          var easing = am5.ease.out(am5.ease.cubic);
        
          // Go through each axis item
          am5.array.each(yAxis.dataItems, function (dataItem) {
            // get corresponding series item
            var seriesDataItem = getSeriesItem(dataItem.get("category"));
        
            if (seriesDataItem) {
              // get index of series data item
              var index = series.dataItems.indexOf(seriesDataItem);
        
              var column = seriesDataItem.get("graphics");
        
              // position after sorting
              var fy =
                yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
                column.height() / 2;
        
              // set index to be the same as series data item index
              if (index != dataItem.get("index")) {
                dataItem.set("index", index);
        
                // current position
                var x = column.x();
                var y = column.y();
        
                column.set("dy", -(fy - y));
                column.set("dx", x);
        
                column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
                column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
              } else {
                column.animate({ key: "y", to: fy, duration: 600, easing: easing });
                column.animate({ key: "x", to: 0, duration: 600, easing: easing });
              }
            }
          });
        
          // Sort axis items by index.
          // This changes the order instantly, but as dx and dy is set and animated,
          // they keep in the same places and then animate to true positions.
          yAxis.dataItems.sort(function (x, y) {
            return x.get("index") - y.get("index");
          });
        }
        
        // Set data
        var data = [{

        }];
        
        yAxis.data.setAll(data_4);
        series.data.setAll(data_4);
        
        
        // Make stuff animate on load
        series.appear(1000);
        chart.appear(1000, 100);
        
        }); // end am5.ready()
}