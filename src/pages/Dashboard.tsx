import { CompetitionCalendarModal } from "../components/competition-calendar";
import { WeatherCard } from "../components/weather-card";
import { WeightChart } from "../components/weigth-chart";
import { Grid } from '@mui/material';
import React from "react";


  export function Dashboard() {


  
    return (
      <Grid 
        container 
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={3} >
          <WeatherCard />
        </Grid>
        <Grid item xs={12} md={6}>
            <WeightChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <CompetitionCalendarModal />
        </Grid>
      </Grid>
    );
  }