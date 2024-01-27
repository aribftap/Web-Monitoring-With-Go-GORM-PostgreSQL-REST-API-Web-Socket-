package service

import (
	"log"
	"web-monitoring-golang/internal/sensor-getar/repositories"
	helpers "web-monitoring-golang/pkg/helper"

	"gorm.io/gorm"
)

type sensorGetarService struct {
	sensorGetarRepo repositories.SensorGetarRepository
}

// GetFirstData implements SensorGetarService.
func (service *sensorGetarService) GetFirstData() helpers.Response {
	var response helpers.Response
	data, err := service.sensorGetarRepo.GetFirstData()
	if err != nil {
		log.Printf("ERROR: Gagal mengambil seluruh data sensor : error %v", err)
		response.Status = 500
		response.Messages = "Gagal mengambil data sensor"
	} else {
		response.Status = 200
		response.Messages = "Berhasil mengambil data sensor"
		response.Data = data
	}
	return response
}

// FetchDataToChart implements SensorGetarService.
func (service *sensorGetarService) FetchDataToChart() helpers.Response {
	var response helpers.Response
	data, err := service.sensorGetarRepo.FetchDataToChart()
	if err != nil {
		log.Printf("ERROR: Gagal mengambil seluruh data sensor : error %v", err)
		response.Status = 500
		response.Messages = "Gagal mengambil data sensor"
	} else {
		response.Status = 200
		response.Messages = "Berhasil mengambil data sensor"
		response.Data = data
	}
	return response
}

// GetAll implements SensorGetarService.
func (service *sensorGetarService) GetAll() helpers.Response {
	var response helpers.Response
	data, err := service.sensorGetarRepo.GetAllData()
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

type SensorGetarService interface {
	FetchDataToChart() helpers.Response
	GetAll() helpers.Response
	GetFirstData() helpers.Response
}

func NewSensorGetarService(db *gorm.DB) SensorGetarService {
	return &sensorGetarService{sensorGetarRepo: repositories.NewSensorGetarRepository(db)}
}
