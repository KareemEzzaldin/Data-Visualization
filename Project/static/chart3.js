function fetchDataAndUpdateChart3() {
    fetch('/get-datachart3')
        .then(response => response.json())
        .then(data => {
            updateChart3(data);
        })
        .catch(error => console.error('Error:', error));
  }
  function updateChart3(data_3) {
        
    // Create root element
  
    am5.ready(function () {
          var root = am5.Root.new("chart3div");
          root.setThemes([am5themes_Animated.new(root)]);
  
          var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
              layout: root.verticalLayout
          }));
  
          var series = chart.series.push(am5percent.FunnelSeries.new(root, {
              alignLabels: false,
              orientation: "vertical",
              valueField: "value3",
              categoryField: "class3"
          }));
  
          series.data.setAll(data_3);

          series.appear();
  
          var legend = chart.children.push(am5.Legend.new(root, {
              centerX: am5.p50,
              x: am5.p50,
              marginTop: 15,
              marginBottom: 15
          }));
  
          legend.data.setAll(series.dataItems);
  
          chart.appear(1000, 100);
      });
  }
  
    
    
  document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart3()
});

