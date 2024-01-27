package service

import (
	"log"
	"web-monitoring-golang/internal/sensor-gyro/repositories"
	helpers "web-monitoring-golang/pkg/helper"

	"gorm.io/gorm"
)

type sensorGyroService struct {
	sensorGyroRepo repositories.SensorGyroRepository
}

// FetchDataToChart implements SensorGetarService.
func (service *sensorGyroService) FetchDataToChart() helpers.Response {
	var response helpers.Response
	data, err := service.sensorGyroRepo.FetchDataToChart()
	if err != nil {
		log.Printf("ERROR: Gagal mengambil data sensor : error %v", err)
		response.Status = 500
		response.Messages = "Gagal mengambil seluruh data sensor"
	} else {
		response.Status = 200
		response.Messages = "Berhasil mengambil data sensor"
		response.Data = data
	}
	return response
}

// GetAll implements SensorGetarService.
func (service *sensorGyroService) GetAll() helpers.Response {
	var response helpers.Response
	data, err := service.sensorGyroRepo.GetAllData()
	if err != nil {
		log.Printf("ERROR: Gagal mengambil seluruh data sensor : error %v", err)
		response.Status = 500
		response.Messages = "Gagal mengambil seluruh data sensor"
	} else {
		response.Status = 200
		response.Messages = "Berhasil mengambil semua data sensor"
		response.Data = data
	}
	return response
}

type SensorGyroService interface {
	FetchDataToChart() helpers.Response
	GetAll() helpers.Response
}

func NewSensorGyroService(db *gorm.DB) SensorGyroService {
	return &sensorGyroService{sensorGyroRepo: repositories.NewSensorGyroRepository(db)}
}
