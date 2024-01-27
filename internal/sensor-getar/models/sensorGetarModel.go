package models

type SensorGetar struct {
	Id         int    `json:"id" gorm:"column:id;primaryKey;autoIncrement"`
	NamaSensor string `json:"nama_sensor" gorm:"column:nama_sensor"`
	Nilai      int    `json:"nilai" gorm:"column:nilai"`
	CreatedAt  string `json:"created_at" gorm:"column:created_at"`
}

func (SensorGetar) TableName() string {
	return "sensor_getar"
}
