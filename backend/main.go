// Copyright (c) 2021 rookie-ninja
//
// Use of this source code is governed by an Apache-style
// license that can be found in the LICENSE file.

package main

import (
	"backend-file-converter/controllers"
	"backend-file-converter/database"
	"backend-file-converter/middlewares"
	"backend-file-converter/models"
	"context"
	"github.com/joho/godotenv"
	"github.com/rookie-ninja/rk-boot/v2"
	"github.com/rookie-ninja/rk-gin/v2/boot"
	"log"
)

// @title Swagger Example API
// @version 1.0
// @description This is a sample rk-demo server.
// @termsOfService http://swagger.io/terms/

// @securityDefinitions.basic BasicAuth

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
func serve() {
	// Create a new boot instance.
	boot := rkboot.NewBoot()
	// Register handler
	entry := rkgin.GetGinEntry("backend-file-converter")
	entry.Router.Use(middlewares.CorsForReact())

	entry.Router.POST("image/multiple/:format", controllers.ConvertMultipleImages)
	entry.Router.POST("register", controllers.Register)
	entry.Router.GET("login", controllers.Login)

	protectedRoutes := entry.Router.Group("/api")
	protectedRoutes.Use(middlewares.JwtAuthMiddleware())

	// Bootstrap
	boot.Bootstrap(context.TODO())

	boot.WaitForShutdownSig(context.TODO())
}

func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("error loading .env file")
	}
}
func loadDatabase() {

	database.Connect()
	database.Database.AutoMigrate(&models.User{})
}

func main() {
	loadEnv()
	loadDatabase()
	serve()
}
