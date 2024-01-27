package repositories

import (
	"web-monitoring-golang/internal/sensor-getar/models"

	"gorm.io/gorm"
)

type dbGetar struct {
	Conn *gorm.DB
}

// GetFirstData implements SensorGetarRepository.
func (db *dbGetar) GetFirstData() ([]models.SensorGetar, error) {
	var data []models.SensorGetar
	result := db.Conn.Order("id desc").Limit(1).Find(&data)
	return data, result.Error
}

// FetchDataToChart implements SensorGetarRepository.
func (db *dbGetar) FetchDataToChart() ([]models.SensorGetar, error) {
	var data []models.SensorGetar
	result := db.Conn.Order("id desc").Limit(10).Find(&data)
	return data, result.Error
}

// GetAllData implements SensorGetarRepository.
func (db *dbGetar) GetAllData() ([]models.SensorGetar, error) {
	var data []models.SensorGetar
	result := db.Conn.Find(&data)
	return data, result.Error
}

type SensorGetarRepository interface {
	FetchDataToChart() ([]models.SensorGetar, error)
	GetAllData() ([]models.SensorGetar, error)
	GetFirstData() ([]models.SensorGetar, error)
}

func NewSensorGetarRepository(Conn *gorm.DB) SensorGetarRepository {
	return &dbGetar{Conn: Conn}
}
