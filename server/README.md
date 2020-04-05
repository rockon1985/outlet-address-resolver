# Outlet Finder Backend App

## About
A simple graphQL based nodejs app which provides API interface to find which outlet comes in the delivery area of the antered address

## Installation
You should have the following to run the app:

- Nodejs v10+
- Google Account with enabled billing and Google Maps API KEY

## Running the app

### 1. First install the dependencies by
```
npm install
```

### 2. Passing the env variables
The app requires few env variables setup.

You can pass them dynamically in your running machine or you can update the values in `config/*.json` file. Default env is set to `development`

### 3. Run the app
```
npm start
```

Run the app on development
```
npm run dev
```