import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WeatherService } from '../../services/weather.service';
import { CitySearchComponent } from './components/search.component';

@Component({
  selector: 'weather-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CitySearchComponent],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      const city = JSON.parse(savedCity);
      this.getWeather(city);
    }
  }

  getWeather(selectedCity: any) {
    this.weatherService.getWeatherByCityId(selectedCity.id).subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}
