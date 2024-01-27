package models

type SensorGyro struct {
	Id         int     `json:"id" gorm:"column:id;primaryKey;autoIncrement"`
	NamaSensor string  `json:"nama_sensor" gorm:"column:nama_sensor"`
	AccelX     float32 `json:"accel_x" gorm:"column:accel_x"`
	AccelY     float32 `json:"accel_y" gorm:"column:accel_y"`
	AccelZ     float32 `json:"accel_z" gorm:"column:accel_z"`
	CreatedAt  string  `json:"created_at" gorm:"column:created_at"`
}

func (SensorGyro) TableName() string {
	return "sensor_gyro"
}
