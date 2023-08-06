import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2290038e37661d719444f4af5c6055e3`
      );
      setWeatherData(response.data);
      setError(null); // Reset error if request is successful
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("City not found. Please try another city.");
        } else if (error.response.status === 429) {
          setError(
            "You've exceeded the API rate limit. Please try again later."
          );
        } else {
          setError("Error fetching weather data. Please try again later.");
        }
      } else {
        setError("Error fetching weather data. Please try again later.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  return (
    <div className="app-container">
      <h1 className="title">Global Weather Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="weather-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="weather-button" type="submit">
          Get Weather
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
