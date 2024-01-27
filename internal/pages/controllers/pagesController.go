package controllers

import (
	"net/http"
	"text/template"
)

type M map[string]interface{}

func DashboardHandler(w http.ResponseWriter, r *http.Request) {
	var data = M{"title": "Dashboard Monitoring IoT | Projek"}
	var tmplHeader = template.Must(template.ParseFiles(
		"web/template/_header.html",
	))

	var errHeader = tmplHeader.ExecuteTemplate(w, "_header", data)
	if errHeader != nil {
		http.Error(w, errHeader.Error(), http.StatusInternalServerError)
	}

	var tmpl = template.Must(template.ParseFiles(
		"web/template/_header.html",
		"web/template/_navbar.html",
		"web/template/_sidebar.html",
		"web/pages/dashboard.html",
		"web/template/_footer.html",
	))

	var err = tmpl.ExecuteTemplate(w, "dashboard", "")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func SensorGetarHandler(w http.ResponseWriter, r *http.Request) {
	var data = M{"title": "Riwayat Sensor Getar Monitoring IoT | Projek "}
	var tmplHeader = template.Must(template.ParseFiles(
		"web/template/_header.html",
	))

	var errHeader = tmplHeader.ExecuteTemplate(w, "_header", data)
	if errHeader != nil {
		http.Error(w, errHeader.Error(), http.StatusInternalServerError)
	}

	var tmpl = template.Must(template.ParseFiles(
		"web/template/_header.html",
		"web/template/_navbar.html",
		"web/template/_sidebar.html",
		"web/pages/sensor-getar.html",
		"web/template/_footer.html",
	))

	var err = tmpl.ExecuteTemplate(w, "sensor-getar", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func SensorGyroHandler(w http.ResponseWriter, r *http.Request) {
	var data = M{"title": "Riwayat Sensor Gyro Monitoring IoT | Projek "}
	var tmplHeader = template.Must(template.ParseFiles(
		"web/template/_header.html",
	))

	var errHeader = tmplHeader.ExecuteTemplate(w, "_header", data)
	if errHeader != nil {
		http.Error(w, errHeader.Error(), http.StatusInternalServerError)
	}
	var tmpl = template.Must(template.ParseFiles(
		"web/template/_header.html",
		"web/template/_navbar.html",
		"web/template/_sidebar.html",
		"web/pages/sensor-gyro.html",
		"web/template/_footer.html",
	))

	var err = tmpl.ExecuteTemplate(w, "sensor-gyro", data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
