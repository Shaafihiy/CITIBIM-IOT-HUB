const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let latestData = {
  temperature: 0,
  humidity: 0,
  pressure: 0,
  lux: 0,
  windSpeed: 0,
  windDirection: "N",
  rainfall: 0,
  latitude: 0,
  longitude: 0,
  satellites: 0,
  signal: 0,
  timestamp: new Date()
};


// Receive weather data from Arduino + SIM800L
app.post("/api/weather", (req, res) => {

  latestData = {
    ...req.body,
    timestamp: new Date()
  };

  console.log("Weather Update:");
  console.log(latestData);

  res.json({
    success: true
  });

});


// Send latest weather data to dashboard
app.get("/api/latest", (req, res) => {

  res.json(latestData);

});


// Test route
app.get("/", (req, res) => {

  res.send("CITIBIM API Server is running");

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

  console.log(`Server running on port ${PORT}`);

});