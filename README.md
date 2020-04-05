# Outlet Finder

## About
A simple graphQL based nodejs app which provides API interface to find which outlet comes in the delivery area of the antered address

## Installation
You should have the following to run the app:
- node 10+
- Docker
- docker-compose version 3

## Running the app

### Running apps locally
Both the backend and frontend apps can be run locally with nodejs installed.
Please go through `server/README.md` and `react-app/README.md` for detailed instructions.

### Running via docker-compose

**NOTE**: The docker-compose still is in development phase, so running using docker-compose may give some errors. Networking needs to be corrected further.

To run the app, just update the environment variables and required ports in `docker-compose.yml` and run command:
```
docker-compose up --build
```

## Assumptions and Challenges

To find if a given coordinate is inside polygon area of a coordinate, two approaches can be used:

1. To use Google Maps Geomerty API's [google.maps.geometry.poly.containsLocation](https://developers.google.com/maps/documentation/javascript/reference/geometry?hl=en#poly.containsLocation) method. But a wrapping NPM package providing this method was not found. Javascript SDK provided by google maps is expected to work fine as a script on front end side, but in backend its difficult to get the Geometry library.

2. We can use ray-casting algorithm, calculating the number of intersection with all the edges of the ploygon. I have used a basic implementation of it in `server/services/polygonService.js`. Although, it assumes a flat 2D plane polygon (unlike the real 3d arc polygon) for the calculations.


## Using the application

### Backend

When you run the backend using `npm start` or `npm run dev`, you can visit `localhost:9002/graphql` to open the GraphiQL screen on browser.

You can test the working by firing query like below:
```
query {
  outlet: getOutletIdentifier(address: "Stumpergasse 51, 1060 Vienna")
}
```