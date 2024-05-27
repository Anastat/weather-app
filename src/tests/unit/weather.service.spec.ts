import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from '../../app/services/weather.service';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data by city ID', () => {
    const mockWeatherData = {
      name: 'Test City',
      main: { temp: 25 },
      weather: [{ description: 'sunny' }],
    };
    const cityId = 123;
    const units = 'metric';

    service.getWeatherByCityId(cityId, units).subscribe((data) => {
      expect(data).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/weather?id=${cityId}&appid=${environment.weatherApiKey}&units=${units}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockWeatherData);
  });
});
