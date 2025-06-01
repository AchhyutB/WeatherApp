async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerText = "Please enter a city name.";
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

    resultDiv.innerHTML = `
      <strong>${data.location.name}, ${data.location.country}</strong><br/>
      Temperature: <strong>${tempC}°C</strong><br/>
      Condition: <em>${condition}</em>`;
  } catch (error) {
    resultDiv.innerText = "Error: " + error.message;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getWeather(); 
    }
  });
});
