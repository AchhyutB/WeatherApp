async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const mapContainer = document.getElementById("mapContainer");

  if (!city) {
    resultDiv.innerText = "Please enter a city name.";
    mapContainer.innerHTML = "";
    return;
  }

  const apiKey = "f18224003ad04287915142217250106";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found.");

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const lat = data.location.lat;
    const lon = data.location.lon;

    resultDiv.innerHTML = `
      <strong>${data.location.name}, ${data.location.country}</strong><br/>
      Temperature: <strong>${tempC}°C</strong><br/>
      Condition: <em>${condition}</em>`;

    mapContainer.innerHTML = `
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=${lat},${lon}&z=10&output=embed"
        allowfullscreen>
      </iframe>`;
  } catch (error) {
    resultDiv.innerText = "Error: " + error.message;
    mapContainer.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getWeather(); 
    }
  });
});
