import { Component, Input, OnInit } from '@angular/core';
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
  @Input() selectedUnits: string = 'metric';
  weather: any;
  city: any;

  constructor(private weatherService: WeatherService) {}

  /**
   * Initialize values from local storage and get weather.
   */
  ngOnInit() {
    const savedCity = localStorage.getItem('selectedCity');
    const savedUnits = localStorage.getItem('selectedUnits');
    if (savedUnits) this.selectedUnits = savedUnits;

    if (savedCity) {
      this.city = JSON.parse(savedCity);
      this.getWeather(this.city.id);
    }
  }

  /**
   * Saves selected units in LocalStorage and refresh weather
   * if city is selected
   *
   * @param units
   */
  selectUnits(units: string) {
    localStorage.setItem('selectedUnits', units);
    if (this.city) this.getWeather(this.city.id);
  }

  /**
   * Sets city to value of selected city.
   *
   * @param selectedCity
   */
  selectCity(selectedCity: any) {
    this.city = selectedCity;
    this.getWeather(this.city.id);
  }

  /**
   * Calls service to get weather info by city identity
   *
   * @param cityId identity of the city
   */
  getWeather(cityId: number) {
    this.weatherService
      .getWeatherByCityId(cityId, this.selectedUnits)
      .subscribe(
        (data) => {
          this.weather = data;
        },
        (error) => {
          console.error('Error fetching weather data', error);
        }
      );
  }
}
