import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherInputComponent } from './weather-input.component';
import { WeatherSelectionComponent } from './weather-selection.component';
import { WeatherDisplayComponent } from './weather-display.component';
import { By } from '@angular/platform-browser';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'searchCities',
      'getWeatherByCityId',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        WeatherInputComponent,
        WeatherSelectionComponent,
        WeatherDisplayComponent,
        WeatherComponent,
      ],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for cities and display selection', () => {
    const mockCities = {
      list: [
        { id: 1, name: 'London', country: 'UK' },
        { id: 2, name: 'London', country: 'Canada' },
      ],
    };

    weatherService.searchCities.and.returnValue(of(mockCities));

    fixture.detectChanges();

    const inputComponent = fixture.debugElement.query(
      By.directive(WeatherInputComponent)
    ).componentInstance;
    inputComponent.search.emit('London');

    fixture.detectChanges();

    expect(component.cities).toEqual(mockCities.list);
  });

  it('should fetch and display weather data for selected city', () => {
    const mockWeather = {
      name: 'London',
      main: { temp: 20 },
      weather: [{ description: 'clear sky' }],
    };

    const selectedCity = { id: 1, name: 'London', country: 'UK' };

    weatherService.getWeatherByCityId.and.returnValue(of(mockWeather));

    component.getWeather(selectedCity);

    fixture.detectChanges();

    expect(component.weather).toEqual(mockWeather);
  });

  it('should load saved city from localStorage on init', () => {
    const savedCity = { id: 1, name: 'London', country: 'UK' };
    localStorage.setItem('selectedCity', JSON.stringify(savedCity));

    weatherService.getWeatherByCityId.and.returnValue(
      of({
        name: 'London',
        main: { temp: 20 },
        weather: [{ description: 'clear sky' }],
      })
    );

    component.ngOnInit();

    expect(component.weatherService.getWeatherByCityId).toHaveBeenCalledWith(
      savedCity.id
    );
  });
});
