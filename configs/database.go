package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type credentialDB struct {
	host     string
	username string
	password string
	database string
	port     string
}

func InitDB() *gorm.DB {

	var dbUrl = credentialDB{
		host:     os.Getenv("DB_HOST"),
		username: os.Getenv("DB_USER"),
		password: os.Getenv("DB_PASSWORD"),
		database: os.Getenv("DB_NAME"),
		port:     os.Getenv("DB_PORT"),
	}

	var err error
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbUrl.host, dbUrl.username, dbUrl.password, dbUrl.database, dbUrl.port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Error to connect database")
	}
	return db
}
