const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const BLYNK_TOKEN = "wx_KExNySnAW7-jl83nWtp-WM-2Anfq6";


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
async function getPin(pin) {
  try {
    const url = `https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&${pin}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Error reading ${pin}`);
    return null;
  }
}
async function getPin(pin) {
  try {
    const url = `https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&${pin}`;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Error reading ${pin}`);
    return null;
  }
}


// POLL BLYNK EVERY 10 SECONDS
setInterval(async () => {

  latestData.temperature = Number(await getPin("V2"));
  latestData.humidity = Number(await getPin("V3"));
  latestData.lux = Number(await getPin("V4"));
  latestData.signal = Number(await getPin("V5"));
  latestData.satellites = Number(await getPin("V6"));

  latestData.pressure = Number(await getPin("V9"));
  latestData.windSpeed = Number(await getPin("V10"));
  latestData.windDirection = await getPin("V11");
  latestData.rainfall = Number(await getPin("V12"));

  latestData.latitude = Number(await getPin("V0"));
  latestData.longitude = Number(await getPin("V1"));

  latestData.timestamp = new Date();

  console.log("Blynk data updated:");
  console.log(latestData);

}, 10000);


app.listen(PORT, "0.0.0.0", () => {

  console.log(`Server running on port ${PORT}`);

});
app.listen(PORT, "0.0.0.0", () => {

  console.log(`Server running on port ${PORT}`);

});