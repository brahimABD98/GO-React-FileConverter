# go-react-fileConverter

## Description
This is a simple file converter written in Go ([rk-gin](https://github.com/rookie-ninja/rk-gin)) and React.

## Features (work in progress)
- [x] convert images to (jpg, png, gif, bmp)


## limitations  
- The maximum file size is 32MB
- it does support multiple images but send them in a single zip file

## Running the application

### Prerequisites
- Go 1.20
- Node 14.15.4
- postgres (for authentication if you want to use auth)
- Docker 20.10.5 (optional,with docker-compose)


### with Docker
- Run in the root directory: 
```console
docker-compose up -d --wait 
```

- The application will be available at `http://localhost:4173`

### without Docker
- Run  in the backend directory:
```console
go mod download	
go run main.go
```
- Run in the frontend directory:
```console
npm install
npm start
```
- The application will be available at [http://localhost:4173](http://localhost:4173)
