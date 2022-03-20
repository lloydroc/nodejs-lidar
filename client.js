// https://canvasjs.com/html5-javascript-dynamic-chart/

console.log("hello lloyd");

var socket = io();

socket.on('connection', function (data) {
    console.log('connected');
});

var dataDistance = [];
var dataStrength = [];


window.onload = function () {
    var xVal = 0;
    var yDistance = 100;
    var yStrength = 100;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function(count) {

        count = count || 1;

        console.log(yDistance, yStrength);

        for (var j = 0; j < count; j++) {
            //yDistance = yDistance + Math.round(5 + Math.random() * (-5 - 5));
            //yStrength = yStrength + Math.round(5 + Math.random() * (-5 - 5));
            dataDistance.push({
                x: xVal,
                y: yDistance
            });
            dataStrength.push({
                x: xVal,
                y: yStrength
            });
            xVal++;
        }

        if (dataDistance.length > dataLength) {
            dataDistance.shift();
        }

        if (dataStrength.length > dataStrength) {
            dataStrength.shift();
        }

        chartDistance.render();
        chartStrength.render();
    };

    var chartDistance = new CanvasJS.Chart("chartContainerDistance", {
        title: {
            text: "Distance [cm]"
        },
        data: [{
            type: "line",
            dataPoints: dataDistance
        }]
    });

    var chartStrength = new CanvasJS.Chart("chartContainerStrength", {
        title: {
            text: "Strength"
        },
        data: [{
            type: "line",
            dataPoints: dataStrength
        }]
    });

    socket.on('message', function (data) {
        var d = JSON.stringify(data);
        console.log(d);
        yDistance = data.distance_cm;
        yStrength = data.strength;
        console.log("got measurement", yDistance, yStrength);
        updateChart(1);
    });

    updateChart(dataLength);
    //setInterval(function () { updateChart() }, updateInterval);
}