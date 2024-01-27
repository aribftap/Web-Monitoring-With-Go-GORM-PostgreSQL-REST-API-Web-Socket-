document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the button elements
    const keretaStatusBtn = document.querySelector('#kereta-status-btn');
    const relStatusBtn = document.querySelector('#rel-status-btn');
    const ledMerahBtn = document.querySelector('#ledMerah-status-btn');
    const ledHijauBtn = document.querySelector('#ledHijau-status-btn');

    function updateStatusDashboard() {
        fetch('http://localhost:3000/api/web-iot/get-first-data-getar')
            .then(response => response.json())
            .then(data => {
                const newNilai = data.data.reverse().map(item => item.nilai);

                // Update for function LedStatus, RelStatus and KeretaStatus based on the new value of "nilai"
                updateLedStatusBtn(newNilai); // Call the function to update the button text
                updateRelStatusBtn(newNilai); // Call the function to update the button text
                updateKeretaStatusBtn(newNilai); // Call the function to update the button text


                // Define a function to update the button text for rel status
                function updateLedStatusBtn(newNilai) {
                    if (newNilai > 845) {
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
                function updateRelStatusBtn(newNilai) {
                    if (newNilai > 845) {
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
                function updateKeretaStatusBtn(newNilai) {
                    if (newNilai > 845) {
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
            });
    };
    setInterval(() => {
        updateStatusDashboard();
    }, 5000);
});