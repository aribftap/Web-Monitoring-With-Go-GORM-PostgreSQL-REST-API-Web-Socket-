$(function () {
    $('#tableGetar').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: 'http://localhost:3000/api/web-iot/get-all-data-getar',
            dataSrc: 'data',
        },
        columns: [
            { data: 'id' },
            { data: 'nama_sensor' },
            { data: 'nilai' },
            { data: 'created_at' }
        ],
    });
});

$(function () {
    $('#tableGyro').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: 'http://localhost:3000/api/web-iot/get-all-data-gyro',
            dataSrc: 'data',
        },
        columns: [
            { data: 'id' },
            { data: 'nama_sensor' },
            { data: 'accel_x' },
            { data: 'accel_y' },
            { data: 'accel_z' },
            { data: 'created_at' }
        ],
    });

});
