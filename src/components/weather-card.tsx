import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from 'react';

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
      <div style={{ padding:'5%'}}>
        {weatherData ? (
          <Card sx={{ width: '100%', height: '40vh', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
            <CardMedia
              component="img"
              height="auto"
              image={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
              sx={{ flex: '0 1 auto', maxHeight: '70%'}}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '30%'}}>
              <Typography gutterBottom variant="h5" component="div">
                {weatherData.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {weatherData.temperature}°C - {weatherData.weather}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    );
  }