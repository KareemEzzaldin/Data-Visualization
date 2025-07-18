document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart2();
});

function fetchDataAndUpdateChart2() {
    fetch('/get-datachart2')
        .then(response => response.json())
        .then(data => {
            updateChart2(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart2(data_2){
    am5.ready(function () {
        var root = am5.Root.new("chart2div");
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout
            })
        );

        var data = [{

        }];

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {}),
                categoryField: "class2"
            })
        );
        xAxis.data.setAll(data_2);

        var series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "City mileage",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                categoryXField: "class2"
            })
        );
        series1.data.setAll(data_2);

        var series2 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Highway mileage",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value22",
                categoryXField: "class2"
            })
        );
        series2.data.setAll(data_2);

        var legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        chart.set("cursor", am5xy.XYCursor.new(root,{}));
    });
}

