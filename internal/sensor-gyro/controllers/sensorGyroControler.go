package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"reflect"
	"time"
	"web-monitoring-golang/internal/sensor-gyro/models"
	service "web-monitoring-golang/internal/sensor-gyro/services"

	"github.com/gorilla/websocket"
	"gorm.io/gorm"
)

type SensorGyroController struct {
	sensorGyroService service.SensorGyroService
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (controller SensorGyroController) FetchRealtimeDataChart(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade failed: ", err)
		return
	}
	defer conn.Close()

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	var lastData []models.SensorGyro

	for range ticker.C {
		result := controller.sensorGyroService.FetchDataToChart()

		// Check if the data has changed before sending
		if data, ok := result.Data.([]models.SensorGyro); ok {
			if !reflect.DeepEqual(data, lastData) {
				err := conn.WriteJSON(result)
				if err != nil {
					log.Println(err)
					break
				}
				lastData = data
			}
		} else {
			log.Println("Invalid data type received")
		}
	}
}

func (controller SensorGyroController) FetchDataChart(w http.ResponseWriter, r *http.Request) {
	// Lakukan pemrosesan sesuai kebutuhan dalam method GetAll
	result := controller.sensorGyroService.FetchDataToChart()

	var httpStatus int

	if result.Status == 200 {
		httpStatus = http.StatusOK
	} else if result.Status == 500 {
		httpStatus = http.StatusInternalServerError
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatus)

	// Encode result ke dalam format JSON dan kirim sebagai response
	err := json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, err.Error(), httpStatus)
		return
	}
}

func (controller SensorGyroController) GetAll(w http.ResponseWriter, r *http.Request) {
	// Lakukan pemrosesan sesuai kebutuhan dalam method GetAll
	result := controller.sensorGyroService.GetAll()

	var httpStatus int

	if result.Status == 200 {
		httpStatus = http.StatusOK
	} else if result.Status == 500 {
		httpStatus = http.StatusInternalServerError
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatus)

	// Encode result ke dalam format JSON dan kirim sebagai response
	err := json.NewEncoder(w).Encode(result)
	if err != nil {
		http.Error(w, err.Error(), httpStatus)
		return
	}
}

func NewSensorGyroController(db *gorm.DB) SensorGyroController {
	service := service.NewSensorGyroService(db)
	controller := SensorGyroController{
		sensorGyroService: service,
	}

	return controller
}
