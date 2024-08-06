
import { WeatherCard } from "../components/weather-card";
import { WeightChart } from "../components/weigth-chart";
import { Calendar } from "@/components/ui/calendar"
import React from "react";


  export function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/4">
        <WeatherCard />
      </div>
      <div className="w-full md:w-1/2">
        <WeightChart />
      </div>
      <div className="w-full md:w-1/4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
  }