function fetchChartSensorGetar() {
  fetch('http://localhost:3000/api/web-iot/fetch-data-chart-getar')
    .then(response => response.json())
    .then(data => {
      // Menyusun data nilai untuk series chart
      const seriesData = data.data.reverse().map(item => item.nilai);

      // Menyusun data jam (dari created_at) untuk categories pada sumbu-x chart
      const categoriesData = data.data.map(item => {
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

      // Define the chart options
      var chartGetar = {
        series: [{
          name: "Output Analog | Sensor Getar",
          data: seriesData
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
          categories: categoriesData,
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
        data: seriesData,
      }]);
      chart.updateOptions({
        xaxis: {
          categories: categoriesData
        }
      });

    });
}

function fetchChartSensorGyroAccelX() {
  fetch('http://localhost:3000/api/web-iot/fetch-data-chart-gyro')
    .then(response => response.json())
    .then(data => {
      // Menyusun data nilai untuk series chart
      const seriesData = data.data.reverse().map(item => item.accel_x);

      // Menyusun data jam (dari created_at) untuk categories pada sumbu-x chart
      const categoriesData = data.data.map(item => {
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

      // Define the chart Accel axis X
      var chartAccelX = {
        series: [{
          name: "Accelerometer | Axis X",
          data: seriesData
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
          categories: categoriesData,
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
        data: seriesData,
      }]);
      chartX.updateOptions({
        xaxis: {
          categories: categoriesData
        }
      });

    });
}

function fetchChartSensorGyroAccelY() {
  fetch('http://localhost:3000/api/web-iot/fetch-data-chart-gyro')
    .then(response => response.json())
    .then(data => {
      // Menyusun data nilai untuk series chart
      const seriesData = data.data.reverse().map(item => item.accel_y);

      // Menyusun data jam (dari created_at) untuk categories pada sumbu-x chart
      const categoriesData = data.data.map(item => {
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

      // Define the chart Accel axis Y
      var chartAccelY = {
        series: [{
          name: "Accelerometer | Axis Y",
          data: seriesData
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
          categories: categoriesData,
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
        data: seriesData,
      }]);
      chartY.updateOptions({
        xaxis: {
          categories: categoriesData
        }
      });

    });
}

function fetchChartSensorGyroAccelZ() {
  fetch('http://localhost:3000/api/web-iot/fetch-data-chart-gyro')
    .then(response => response.json())
    .then(data => {
      // Menyusun data nilai untuk series chart
      const seriesData = data.data.reverse().map(item => item.accel_z);

      // Menyusun data jam (dari created_at) untuk categories pada sumbu-x chart
      const categoriesData = data.data.map(item => {
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
      // Define the chart Accel axis Z
      var chartAccelZ = {
        series: [{
          name: "Accelerometer | Axis Z",
          data: seriesData
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
          categories: categoriesData,
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
        data: seriesData,
      }]);
      chartZ.updateOptions({
        xaxis: {
          categories: categoriesData
        }
      });

    });
}
setInterval(() => {
  fetchChartSensorGetar();
  fetchChartSensorGyroAccelX();
  fetchChartSensorGyroAccelY();
  fetchChartSensorGyroAccelZ();
}, 5000);


