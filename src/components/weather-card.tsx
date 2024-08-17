import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import { Card, CardContent } from "./ui/card";

interface WeatherData {
    city: string;
    temperature: number;
    weather: string;
    icon: string;
  }

export function WeatherCard() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const apiKey = "91454b3c094b7aab350c2273ccc5c318"; 
    const city = "Natal";
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          const data = response.data;
          setWeatherData({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        } catch (error) {
          console.error("Erro ao buscar dados do tempo:", error);
        }
      };
  
      fetchWeatherData();
    }, [city, apiKey]);
  
    return (
      <div className="py-4 px-2 h-full">
        {weatherData ? (
          <Card className="w-full mx-auto flex flex-col justify-between h-full">
            <div className="flex-shrink-0 max-h-[70%] flex items-center justify-center">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                alt="Weather icon"
                className="object-contain w-full h-full"
              />
            </div>
            <CardContent className="flex flex-col justify-end h-[30%] p-4">
              <h5 className="text-lg font-semibold mb-2">{weatherData.city}</h5>
              <p className="text-sm text-gray-500">
                {weatherData.temperature}°C - {weatherData.weather}
              </p>
            </CardContent>
          </Card>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    );
  }