import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitiesMenu } from './citiesMenu.component';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'city-search',
  standalone: true,
  imports: [CommonModule, FormsModule, CitiesMenu],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class CitySearchComponent {
  @Output() selectCity = new EventEmitter<any>();

  city: string = '';
  cities: any;
  showMenu: boolean = false;

  constructor(private weatherService: WeatherService) {}

  /**
   * Calls service to retrive data by city name applied in input.
   */
  getWeather() {
    this.weatherService.getWeatherByCity(this.city).subscribe(
      (data) => {
        this.cities = data.list;
        this.showMenu = true;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  /**
   * Emits from child component to parent.
   * 
   * @param selectedCity 
   */
  onSelectCity(selectedCity: any) {
    this.showMenu = false;
    this.selectCity.emit(selectedCity);
  }
}
