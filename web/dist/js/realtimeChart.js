function webSocketSensorGetar() {
    // Connect to the Socket.io server
    var socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-getar');

    // Initialize newData and newCategories
    var seriesDataGetar = [];
    var categoriesDataGetar = [];

    // Check if the socket is connected
    socket.onopen = function () {
        console.log('Socket Getar is connected.');
    };

    // Listen for the "message" event
    socket.onmessage = function (event) {
        try {
            // Check if event.data is already an object
            var data = typeof event.data === 'object' ? event.data : JSON.parse(event.data);

            // Ensure data.data is an array before processing
            if (Array.isArray(data.data)) {
                // Extract the data from the response
                seriesDataGetar = data.data.reverse().map(function (item) {
                    return item.nilai;
                });
                categoriesDataGetar = data.data.map(function (item) {
                    // Mengonversi string created_at menjadi objek Date
                    const dateObj = new Date(item.created_at);

                    // Mengambil informasi jam, menit, detik, dan milidetik dari objek Date
                    const jam = dateObj.getUTCHours();
                    const menit = dateObj.getUTCMinutes();
                    const detik = dateObj.getUTCSeconds();

                    // Menggabungkan informasi waktu menjadi sebuah string
                    const waktu = `${jam}:${menit}:${detik}`;

                    return waktu;
                });

                // Update the chart
                updateChart(seriesDataGetar, categoriesDataGetar);
            } else {
                console.error('Invalid data format received.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    function updateChart(seriesDataGetar, categoriesDataGetar) {
        // Define the chart options
        var chartGetar = {
            series: [{
                name: "Output Analog | Sensor Getar",
                data: []
            },],
            chart: {
                height: 250,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
            },
            colors: ["#0E185F"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Data Sensor Getar',
                align: 'left'
            },
            noData: {
                text: 'Loading...'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Waktu'
                }
            },
            yaxis: {
                title: {
                    text: 'Analog'
                },
            },
            legend: {
                showForSingleSeries: true,
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        };

        // Initialize the chart
        var chart = new ApexCharts(
            document.querySelector("#chartGetar"),
            chartGetar
        );

        // Render the chart
        chart.render();

        // Update Data Chart
        chart.updateSeries([{
            data: seriesDataGetar
        }]);
        chart.updateOptions({
            xaxis: {
                categories: categoriesDataGetar
            }
        });
        console.log('DATA TERBARU SENSOR GETAR MASUK'); // Debugging line
        console.log(seriesDataGetar, categoriesDataGetar); // Debugging line
    }

    // Handle the error event
    socket.onerror = function (error) {
        console.log('Socket Getar error: ', error);
    };

    // Handle the close event
    socket.onclose = function (event) {
        console.log('Socket Getar closed: ', event);
        // Reconnect the socket if needed
        socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-getar');
    };

}

function webSocketSensorGyroAccelX() {
    // Connect to the Socket.io server
    var socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');

    // Initialize newData and newCategories
    var seriesDataGyroAccelX = [];
    var categoriesDataGyroAccelX = [];

    // Check if the socket is connected
    socket.onopen = function () {
        console.log('Socket Gyro Accel X is connected.');
    };

    // Listen for the "message" event
    socket.onmessage = function (event) {
        try {
            // Check if event.data is already an object
            var data = typeof event.data === 'object' ? event.data : JSON.parse(event.data);

            // Ensure data.data is an array before processing
            if (Array.isArray(data.data)) {
                // Extract the data from the response
                seriesDataGyroAccelX = data.data.reverse().map(function (item) {
                    return item.accel_x;
                });
                categoriesDataGyroAccelX = data.data.map(function (item) {
                    // Mengonversi string created_at menjadi objek Date
                    const dateObj = new Date(item.created_at);

                    // Mengambil informasi jam, menit, detik, dan milidetik dari objek Date
                    const jam = dateObj.getUTCHours();
                    const menit = dateObj.getUTCMinutes();
                    const detik = dateObj.getUTCSeconds();

                    // Menggabungkan informasi waktu menjadi sebuah string
                    const waktu = `${jam}:${menit}:${detik}`;

                    return waktu;
                });

                // Update the chart
                updateChart(seriesDataGyroAccelX, categoriesDataGyroAccelX);
            } else {
                console.error('Invalid data format received.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    function updateChart(seriesDataGyroAccelX, categoriesDataGyroAccelX) {
        // Define the chart Accel axis X
        var chartAccelX = {
            series: [{
                name: "Accelerometer | Axis X",
                data: []
            },],
            chart: {
                height: 250,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
            },
            colors: ['#30E3DF'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Data Sensor Gyro',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Waktu'
                }
            },
            yaxis: {
                title: {
                    text: 'Akselerasi (m/s²)'
                },
            },
            legend: {
                showForSingleSeries: true,
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
        };

        // Initialize and render the charts
        var chartX = new ApexCharts(
            document.querySelector("#chartAccelX"),
            chartAccelX);

        chartX.render();

        // Update data chart
        chartX.updateSeries([{
            data: seriesDataGyroAccelX
        }]);
        chartX.updateOptions({
            xaxis: {
                categories: categoriesDataGyroAccelX
            }
        });

        console.log('DATA TERBARU SENSOR GYRO ACCEL X MASUK'); // Debugging line
        console.log(seriesDataGyroAccelX, categoriesDataGyroAccelX); // Debugging line
    }

    // Handle the error event
    socket.onerror = function (error) {
        console.log('Socket Gyro Accel X error: ', error);
    };

    // Handle the close event
    socket.onclose = function (event) {
        console.log('Socket Gyro Accel X closed: ', event);
        // Reconnect the socket if needed
        socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');
    };
}

function webSocketSensorGyroAccelY() {
    // Connect to the Socket.io server
    var socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');

    // Initialize newData and newCategories
    var seriesDataGyroAccelY = [];
    var categoriesDataGyroAccelY = [];

    // Check if the socket is connected
    socket.onopen = function () {
        console.log('Socket Gyro Accel Y is connected.');
    };

    // Listen for the "message" event
    socket.onmessage = function (event) {
        try {
            // Check if event.data is already an object
            var data = typeof event.data === 'object' ? event.data : JSON.parse(event.data);

            // Ensure data.data is an array before processing
            if (Array.isArray(data.data)) {
                // Extract the data from the response
                seriesDataGyroAccelY = data.data.reverse().map(function (item) {
                    return item.accel_y;
                });
                categoriesDataGyroAccelY = data.data.map(function (item) {
                    // Mengonversi string created_at menjadi objek Date
                    const dateObj = new Date(item.created_at);

                    // Mengambil informasi jam, menit, detik, dan milidetik dari objek Date
                    const jam = dateObj.getUTCHours();
                    const menit = dateObj.getUTCMinutes();
                    const detik = dateObj.getUTCSeconds();

                    // Menggabungkan informasi waktu menjadi sebuah string
                    const waktu = `${jam}:${menit}:${detik}`;

                    return waktu;
                });

                // Update the chart
                updateChart(seriesDataGyroAccelY, categoriesDataGyroAccelY);
            } else {
                console.error('Invalid data format received.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    function updateChart(seriesDataGyroAccelY, categoriesDataGyroAccelY) {
        // Define the chart Accel axis Y
        var chartAccelY = {
            series: [{
                name: "Accelerometer | Axis Y",
                data: []
            },],
            chart: {
                height: 250,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
            },
            colors: ['#FF9A00'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Data Sensor Gyro',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Waktu'
                }
            },
            yaxis: {
                title: {
                    text: 'Akselerasi (m/s²)'
                },
            },
            legend: {
                showForSingleSeries: true,
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
        };

        // Initialize and render the charts
        var chartY = new ApexCharts(document.querySelector("#chartAccelY"), chartAccelY);
        chartY.render();

        // Update Data Chart
        chartY.updateSeries([{
            data: seriesDataGyroAccelY
        }]);
        chartY.updateOptions({
            xaxis: {
                categories: categoriesDataGyroAccelY
            }
        });
        console.log('DATA TERBARU SENSOR GYRO ACCEL Y MASUK'); // Debugging line
        console.log(seriesDataGyroAccelY, categoriesDataGyroAccelY); // Debugging line
    }

    // Handle the error event
    socket.onerror = function (error) {
        console.log('Socket Gyro Accel Y error: ', error);
    };

    // Handle the close event
    socket.onclose = function (event) {
        console.log('Socket Gyro Accel Y closed: ', event);
        // Reconnect the socket if needed
        socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');
    };
}


function webSocketSensorGyroAccelZ() {
    // Connect to the Socket.io server
    var socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');

    // Initialize newData and newCategories
    var seriesDataGyroAccelZ = [];
    var categoriesDataGyroAccelZ = [];

    // Check if the socket is connected
    socket.onopen = function () {
        console.log('Socket Gyro Accel Z is connected.');
    };

    // Listen for the "message" event
    socket.onmessage = function (event) {
        try {
            // Check if event.data is already an object
            var data = typeof event.data === 'object' ? event.data : JSON.parse(event.data);

            // Ensure data.data is an array before processing
            if (Array.isArray(data.data)) {
                // Extract the data from the response
                seriesDataGyroAccelZ = data.data.reverse().map(function (item) {
                    return item.accel_z;
                });
                categoriesDataGyroAccelZ = data.data.map(function (item) {
                    // Mengonversi string created_at menjadi objek Date
                    const dateObj = new Date(item.created_at);

                    // Mengambil informasi jam, menit, detik, dan milidetik dari objek Date
                    const jam = dateObj.getUTCHours();
                    const menit = dateObj.getUTCMinutes();
                    const detik = dateObj.getUTCSeconds();

                    // Menggabungkan informasi waktu menjadi sebuah string
                    const waktu = `${jam}:${menit}:${detik}`;

                    return waktu;
                });

                // Update the chart
                updateChart(seriesDataGyroAccelZ, categoriesDataGyroAccelZ);
            } else {
                console.error('Invalid data format received.');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    function updateChart(seriesDataGyroAccelZ, categoriesDataGyroAccelZ) {
        // Define the chart Accel axis Z
        var chartAccelZ = {
            series: [{
                name: "Accelerometer | Axis Z",
                data: []
            },],
            chart: {
                height: 250,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#38E54D'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Data Sensor Gyro',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Waktu'
                }
            },
            yaxis: {
                title: {
                    text: 'Akselerasi (m/s²)'
                },
            },
            legend: {
                showForSingleSeries: true,
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
        };
        // Initialize and render the charts
        var chartZ = new ApexCharts(document.querySelector("#chartAccelZ"), chartAccelZ);
        chartZ.render();

        // Update Data Chart
        chartZ.updateSeries([{
            data: seriesDataGyroAccelZ
        }]);
        chartZ.updateOptions({
            xaxis: {
                categories: categoriesDataGyroAccelZ
            }
        });
        console.log('DATA TERBARU SENSOR GYRO ACCEL Z MASUK'); // Debugging line
        console.log(seriesDataGyroAccelZ, categoriesDataGyroAccelZ); // Debugging line
    }

    // Handle the error event
    socket.onerror = function (error) {
        console.log('Socket Gyro Accel Z error: ', error);
    };

    // Handle the close event
    socket.onclose = function (event) {
        console.log('Socket Gyro Accel Z closed: ', event);
        // Reconnect the socket if needed
        socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-gyro');
    };
}

webSocketSensorGetar();
webSocketSensorGyroAccelX();
webSocketSensorGyroAccelY();
webSocketSensorGyroAccelZ();