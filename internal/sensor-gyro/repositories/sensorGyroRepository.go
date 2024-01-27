package repositories

import (
	"web-monitoring-golang/internal/sensor-gyro/models"

	"gorm.io/gorm"
)

type dbGyro struct {
	Conn *gorm.DB
}

// FetchDataToChart implements SensorGyroRepository.
func (db *dbGyro) FetchDataToChart() ([]models.SensorGyro, error) {
	var data []models.SensorGyro
	result := db.Conn.Order("id desc").Limit(10).Find(&data)
	return data, result.Error
}

// GetAllData implements SensorGyroRepository.
func (db *dbGyro) GetAllData() ([]models.SensorGyro, error) {
	var data []models.SensorGyro
	result := db.Conn.Find(&data)
	return data, result.Error
}

type SensorGyroRepository interface {
	FetchDataToChart() ([]models.SensorGyro, error)
	GetAllData() ([]models.SensorGyro, error)
}

func NewSensorGyroRepository(Conn *gorm.DB) SensorGyroRepository {
	return &dbGyro{Conn: Conn}
}
