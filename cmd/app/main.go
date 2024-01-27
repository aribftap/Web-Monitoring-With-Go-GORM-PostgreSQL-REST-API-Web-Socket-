package main

import (
	"log"
	"net/http"
	"os"
	config "web-monitoring-golang/configs"
	router "web-monitoring-golang/internal/routes"
)

func init() {
	config.LoadEnv()
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	router := router.NewRouter()

	log.Println("Server running on port: 3000")
	http.ListenAndServe(":"+port, router)
}
