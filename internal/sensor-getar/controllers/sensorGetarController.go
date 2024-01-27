package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"reflect"
	"time"
	"web-monitoring-golang/internal/sensor-getar/models"
	service "web-monitoring-golang/internal/sensor-getar/services"

	"github.com/gorilla/websocket"
	"gorm.io/gorm"
)

type SensorGetarController struct {
	sensorGetarService service.SensorGetarService
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (controller SensorGetarController) FetchRealtimeDataChart(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade failed: ", err)
		return
	}
	defer conn.Close()

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	var lastData []models.SensorGetar

	for range ticker.C {
		result := controller.sensorGetarService.FetchDataToChart()

		// Check if the data has changed before sending
		if data, ok := result.Data.([]models.SensorGetar); ok {
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

func (controller SensorGetarController) RealtimeNotifikasiKereta(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade failed: ", err)
		return
	}
	defer conn.Close()

	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	var lastData []models.SensorGetar

	for range ticker.C {
		result := controller.sensorGetarService.GetFirstData()

		// Check if the data has changed before sending
		if data, ok := result.Data.([]models.SensorGetar); ok {
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

func (controller SensorGetarController) FetchDataChart(w http.ResponseWriter, r *http.Request) {
	// Lakukan pemrosesan sesuai kebutuhan dalam method GetAll
	result := controller.sensorGetarService.FetchDataToChart()

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

func (controller SensorGetarController) GetAll(w http.ResponseWriter, r *http.Request) {
	// Lakukan pemrosesan sesuai kebutuhan dalam method GetAll
	result := controller.sensorGetarService.GetAll()

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

func (controller SensorGetarController) GetFirstData(w http.ResponseWriter, r *http.Request) {
	// Lakukan pemrosesan sesuai kebutuhan dalam method GetAll
	result := controller.sensorGetarService.GetFirstData()

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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func NewSensorGetarController(db *gorm.DB) SensorGetarController {
	service := service.NewSensorGetarService(db)
	controller := SensorGetarController{
		sensorGetarService: service,
	}

	return controller
}
