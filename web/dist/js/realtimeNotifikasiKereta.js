function webSocketRealtimeNotifKereta() {
    // Connect to the Socket.io server
    var socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-realtime-notif');

    // Initialize newDataNotif
    var newDataNotif = [];

    document.addEventListener('DOMContentLoaded', function () {
        // Get a reference to the button elements
        const keretaStatusBtn = document.querySelector('#kereta-status-btn');
        const relStatusBtn = document.querySelector('#rel-status-btn');
        const ledMerahBtn = document.querySelector('#ledMerah-status-btn');
        const ledHijauBtn = document.querySelector('#ledHijau-status-btn');

        function updateStatusDashboard(newDataNotif) {
            // Update for function LedStatus, RelStatus, and KeretaStatus based on the new value of "Data Notif"
            updateLedStatusBtn(newDataNotif);
            updateRelStatusBtn(newDataNotif);
            updateKeretaStatusBtn(newDataNotif);
        }


        // Define a function to update the button text for rel status
        function updateLedStatusBtn(newDataNotif) {
            if (newDataNotif > 845) {
                ledMerahBtn.textContent = 'OFF';
                ledMerahBtn.classList.remove('bg-warning');
                ledMerahBtn.classList.remove('bg-success');
                ledMerahBtn.classList.add('bg-danger');
                ledHijauBtn.textContent = 'ON';
                ledHijauBtn.classList.remove('bg-warning');
                ledHijauBtn.classList.remove('bg-danger');
                ledHijauBtn.classList.add('bg-success');
            } else {
                ledMerahBtn.textContent = 'ON';
                ledMerahBtn.classList.remove('bg-warning');
                ledMerahBtn.classList.remove('bg-danger');
                ledMerahBtn.classList.add('bg-success');
                ledHijauBtn.textContent = 'OFF';
                ledHijauBtn.classList.remove('bg-warning');
                ledHijauBtn.classList.remove('bg-success');
                ledHijauBtn.classList.add('bg-danger');
            }
        }

        // Define a function to update the button text for rel status
        function updateRelStatusBtn(newDataNotif) {
            if (newDataNotif > 845) {
                relStatusBtn.textContent = 'KOSONG';
                relStatusBtn.classList.remove('bg-warning');
                relStatusBtn.classList.remove('bg-danger');
                relStatusBtn.classList.add('bg-success');
            } else {
                relStatusBtn.textContent = 'TERISI';
                relStatusBtn.classList.remove('bg-warning');
                relStatusBtn.classList.remove('bg-success');
                relStatusBtn.classList.add('bg-danger');
            }
        }

        // Define a function to update the button text for kereta status
        function updateKeretaStatusBtn(newDataNotif) {
            if (newDataNotif > 845) {
                keretaStatusBtn.textContent = 'TIDAK ADA KERETA';
                keretaStatusBtn.classList.remove('bg-warning');
                keretaStatusBtn.classList.remove('bg-danger');
                keretaStatusBtn.classList.add('bg-success');
            } else {
                keretaStatusBtn.textContent = 'ADA KERETA';
                keretaStatusBtn.classList.remove('bg-warning');
                keretaStatusBtn.classList.remove('bg-success');
                keretaStatusBtn.classList.add('bg-danger');
            }
        }

        // Check if the socket is connected
        socket.onopen = function () {
            console.log('Socket Realtime Notif is connected.');
        };

        // Listen for the "message" event
        socket.onmessage = function (event) {
            try {
                // Check if event.data is already an object
                var data = typeof event.data === 'object' ? event.data : JSON.parse(event.data);

                // Ensure data.data is an array before processing
                if (Array.isArray(data.data)) {
                    // Extract the data from the response
                    newDataNotif = data.data.map(function (item) {
                        return item.nilai;
                    });

                    // Update the notif
                    updateStatusDashboard(newDataNotif);
                } else {
                    console.error('Invalid data format received.');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        // Handle the error event
        socket.onerror = function (error) {
            console.log('Socket Realtime Notif error: ', error);
        };

        // Handle the close event
        socket.onclose = function (event) {
            console.log('Socket Realtime Notif closed: ', event);
            // Reconnect the socket if needed
            socket = new WebSocket('ws://localhost:3000/api/web-iot/ws-realtime-notif');
        };

        // Call updateStatusDashboard after defining it
        updateStatusDashboard();
    });
}

webSocketRealtimeNotifKereta();
