package routes

import (
	"net/http"
	config "web-monitoring-golang/configs"
	pagesController "web-monitoring-golang/internal/pages/controllers"
	sensorGetarController "web-monitoring-golang/internal/sensor-getar/controllers"
	sensorGyroController "web-monitoring-golang/internal/sensor-gyro/controllers"

	"github.com/gorilla/mux"
)

func NewRouter() http.Handler {
	db := config.InitDB()

	r := mux.NewRouter()

	directoryPath1 := "assets/" // Sesuaikan dengan struktur direktori proyekmu

	// Pastikan path yang ditetapkan di http.Dir sesuai dengan struktur direktori file CSS
	fileServer1 := http.FileServer(http.Dir(directoryPath1))

	// Pastikan URL yang kamu tentukan di route http.Handle sesuai dengan path pada tag HTML
	r.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", fileServer1))

	directoryPath2 := "web/dist/" // Sesuaikan dengan struktur direktori proyekmu

	// Pastikan path yang ditetapkan di http.Dir sesuai dengan struktur direktori file CSS
	fileServer2 := http.FileServer(http.Dir(directoryPath2))

	// Pastikan URL yang kamu tentukan di route http.Handle sesuai dengan path pada tag HTML
	r.PathPrefix("/web/dist/").Handler(http.StripPrefix("/web/dist/", fileServer2))

	directoryPath3 := "web/plugins/" // Sesuaikan dengan struktur direktori proyekmu

	// Pastikan path yang ditetapkan di http.Dir sesuai dengan struktur direktori file CSS
	fileServer3 := http.FileServer(http.Dir(directoryPath3))

	// Pastikan URL yang kamu tentukan di route http.Handle sesuai dengan path pada tag HTML
	r.PathPrefix("/web/plugins/").Handler(http.StripPrefix("/web/plugins/", fileServer3))

	// Pages Route
	r.HandleFunc("/dashboard", pagesController.DashboardHandler)
	r.HandleFunc("/riwayat-sensor-getar", pagesController.SensorGetarHandler)
	r.HandleFunc("/riwayat-sensor-gyro", pagesController.SensorGyroHandler)

	// API Route
	apiIoTWeb := r.PathPrefix("/api/web-iot/").Subrouter()

	// API Sensor Getar Route
	sensorGetarController := sensorGetarController.NewSensorGetarController(db)
	apiIoTWeb.HandleFunc("/fetch-data-chart-getar", sensorGetarController.FetchDataChart).Methods("GET")
	apiIoTWeb.HandleFunc("/get-all-data-getar", sensorGetarController.GetAll).Methods("GET")
	apiIoTWeb.HandleFunc("/get-first-data-getar", sensorGetarController.GetFirstData).Methods("GET")

	// Websocket Sensor Getar Route
	apiIoTWeb.HandleFunc("/ws-getar", sensorGetarController.FetchRealtimeDataChart)
	apiIoTWeb.HandleFunc("/ws-realtime-notif", sensorGetarController.RealtimeNotifikasiKereta)

	// APi Sensor Gyro Route
	sensorGyroController := sensorGyroController.NewSensorGyroController(db)
	apiIoTWeb.HandleFunc("/fetch-data-chart-gyro", sensorGyroController.FetchDataChart).Methods("GET")
	apiIoTWeb.HandleFunc("/get-all-data-gyro", sensorGyroController.GetAll).Methods("GET")

	// Websocket Sensor Gyro Route
	apiIoTWeb.HandleFunc("/ws-gyro", sensorGyroController.FetchRealtimeDataChart)

	return r
}
