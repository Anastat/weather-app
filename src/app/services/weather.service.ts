import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private api = 'http://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  /**
   * Gets weather by city name.
   *
   * @param {String} city
   *
   * @returns object contains list of data info by city name
   */
  getWeatherByCity(city: String): Observable<any> {
    return this.http.get(`${this.api}/find?q=${city}&appid=${this.apiKey}`);
  }

  /**
   * Gets weather by city identity
   *
   * @param cityId
   *
   * @returns object data
   */
  getWeatherByCityId(cityId: number, units: string): Observable<any> {
    return this.http.get(
      `${this.api}/weather?id=${cityId}&appid=${this.apiKey}&units=${units}`
    );
  }
}
