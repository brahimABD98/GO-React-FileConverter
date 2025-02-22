package controllers

import (
	"archive/zip"
	"bytes"
	"github.com/disintegration/imaging"
	"github.com/gin-gonic/gin"
	"log"
	"mime/multipart"
	"net/http"
	"path"
	"strings"
)

func ConvertImage(ctx *gin.Context) {

	outputFormat := ctx.Param("format")
	validFormat, err := imaging.FormatFromExtension(outputFormat)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	file, err := isValidFile(input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "error while opening the file"})
		return
	}
	imageBuffer, err := convertOneImageToOneExtension(file, validFormat)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error while converting image"})
		return
	}

	validName := formatFileName(input.Filename, validFormat)

	ctx.Header("Content-Disposition", "attachment; filename="+validName)
	ctx.Header("Content-Type", "image/"+validFormat.String())

	ctx.Writer.Write(imageBuffer.Bytes())

}

func ConvertMultipleImages(ctx *gin.Context) {

	outputFormat := ctx.Param(`format`)

	validFormat, err := imaging.FormatFromExtension(outputFormat)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": strings.ToLower(outputFormat) + " isn't a valid format"})
		return
	}

	form, err := ctx.MultipartForm()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "please provide files"})
		return
	}

	inputs := form.File["file"]

	if len(inputs) < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "please enter at least one file "})
		return
	}

	fileNamesList := make([]string, 0, len(inputs))

	images := make([][]byte, 0, len(inputs))

	for _, input := range inputs {

		file, err := isValidFile(input)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "please make sure you have a valid file format:" + input.Filename})
			return
		}

		fileName := formatFileName(input.Filename, validFormat)

		fileNamesList = append(fileNamesList, fileName)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "couldn't open the file:" + input.Filename})
			return
		}

		imageBuffer, err := convertOneImageToOneExtension(file, validFormat)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "couldn't convert " + input.Filename})
		}
		images = append(images, imageBuffer.Bytes())

	}

	newZip, err := compressImages(images, fileNamesList)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error while compressing files"})
	}

	ctx.Header("Content-Type", "application/zip")
	ctx.Header("Content-Disposition", "attachment; filename=output.zip")

	_, err = ctx.Writer.Write(newZip)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "error while sending zip file"})
		return
	}

}

func isValidFile(input *multipart.FileHeader) (multipart.File, error) {
	file, err := input.Open()
	if err != nil {
		return nil, err
	}
	defer func() {
		err := file.Close()
		if err != nil {
			log.Println("error while opening file", err)
		}
	}()
	return file, err
}
func compressImages(images [][]byte, fileNames []string) ([]byte, error) {
	buffer := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buffer)

	for i, image := range images {
		fileWriter, err := zipWriter.Create(fileNames[i])
		if err != nil {
			zipWriter.Close()
			return nil, err
		}
		if _, err := fileWriter.Write(image); err != nil {
			zipWriter.Close()
			return nil, err
		}
	}

	if err := zipWriter.Close(); err != nil {
		return nil, err
	}

	return buffer.Bytes(), nil
}

func removeExtension(fileName string) string {
	extension := path.Ext(fileName)
	fileNameWithoutExtension := fileName[0 : len(fileName)-len(extension)]
	return fileNameWithoutExtension
}

func formatFileName(fileName string, validFormat imaging.Format, suffix ...string) string {

	if len(suffix) > 0 {
		return removeExtension(fileName) + "_" + strings.Join(suffix, "_") + "." + strings.ToLower(validFormat.String())
	}
	return removeExtension(fileName) + "." + strings.ToLower(validFormat.String())

}

func convertOneImageToOneExtension(file multipart.File, validFormat imaging.Format) (bytes.Buffer, error) {
	var imageBuffer bytes.Buffer
	image, err := imaging.Decode(file)
	if err != nil {
		return imageBuffer, err
	}
	if err := imaging.Encode(&imageBuffer, image, validFormat); err != nil {
		return imageBuffer, err
	}
	return imageBuffer, nil

}

func TransformImage(ctx *gin.Context) {
	input, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err = imaging.Open(input.Filename, imaging.AutoOrientation(true))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "no valid file"})
	}

}
