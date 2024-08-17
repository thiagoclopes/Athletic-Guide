import { CalendarCard } from "@/components/calendar-card";
import { WeatherCard } from "../components/weather-card";
import { WeightChart } from "../components/weigth-chart";
import React from "react";
import { WeightInputCard } from "@/components/weight-input-card";

export function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[22%]">
          <WeatherCard />
        </div>
        <div className="w-full md:w-[50%]">
          <WeightChart />
        </div>
        <div className="w-full md:w-auto">
          <CalendarCard />
        </div>
        
      </div>
      <div className="w-full md:w-[22%]">
        <WeightInputCard/>
      </div>
    </div>
  );
}