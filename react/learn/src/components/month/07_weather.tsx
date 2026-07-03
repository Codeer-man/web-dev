import React, { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const weatherApi = import.meta.env.VITE_API_URL_weather;

  useEffect(() => {
    const savedCity = localStorage.getItem("city");

    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem("city", city);
    }
  }, [city]);

  if (!weatherApi) {
    return <p>No api key</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`,
      );
      console.log(response);

      if (!response.ok) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(data);

      setWeather(data);
    } catch (error: any) {
      setError(error);
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
        />
        <button type="submit">Show weather</button>
      </form>

      <br />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>

          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>

          <p>
            <strong>Condition:</strong> {weather.weather[0].main}
          </p>

          <p>
            <strong>Description:</strong> {weather.weather[0].description}
          </p>

          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>

          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
