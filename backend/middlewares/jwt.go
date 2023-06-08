package middlewares

import (
	"backend-file-converter/helper"
	"github.com/gin-gonic/gin"
	"net/http"
)

func JwtAuthMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.ValidateJwt(context)
		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication is required"})
			context.Abort()
			return
		}
		context.Next()
	}

}
