function fetchDataAndUpdateChart() {
    fetch('/get-datachart')
        .then(response => response.json())
        .then(data => {
            updateChart(data);
        })
        .catch(error => console.error('Error:', error));
}
function updateChart(data_df) {
 
    //console.log(data_df)
    am5.ready(function() {
        
    // Create root element
           // Create root element
      
           var root = am5.Root.new("chartdiv");
      
           //set themes
         
           root.setThemes([
             am5themes_Animated.new(root),
           ]);
           
           var chart = root.container.children.push( 
             am5percent.PieChart.new(root, {
               layout: root.verticalHorizontal
             }) 
           );
           
           // Define data
           var data = [{}];
           
           // Create series
           var series = chart.series.push(
             am5percent.PieSeries.new(root, {
               name: "CARS DISTRIBUTION",
               valueField: "value",
               categoryField: "class"
             })
           );
           series.data.setAll(data_df);
           
           // Add legend
           var legend = chart.children.push(am5.Legend.new(root, {
             centerX: am5.percent(50),
             x: am5.percent(50),
             layout: root.horizontalLayout
           }));
           
           legend.data.setAll(series.dataItems);  
           });
   
    
}
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart()
});
 