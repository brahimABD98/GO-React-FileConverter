package models

type ImageTransformInput struct {
	Height int `json:"height" biding:"required"`
	Width  int `json:"width" biding:"required"`
	filter int `json:"quality"binding:"required"`
}
