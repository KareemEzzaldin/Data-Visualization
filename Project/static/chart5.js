document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart5();
});

function fetchDataAndUpdateChart5() {
    fetch('/get-datachart5')
        .then(response => response.json())
        .then(data => {
            updateChart5(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateChart5(data_5){
    am5.ready(function () {
        var root = am5.Root.new("chart5div");
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
                categoryField: "class5"
            })
        );
        xAxis.data.setAll(data_5);

        var series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Car Price    ",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value5",
                categoryXField: "class5"
            })
        );
        series1.data.setAll(data_5);

        var legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        chart.set("cursor", am5xy.XYCursor.new(root,{}));
    });
}
