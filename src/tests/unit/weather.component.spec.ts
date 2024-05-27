import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from '../../app/features/weather/weather.component';
import { WeatherService } from '../../app/services/weather.service';
import { CitySearchComponent } from '../../app/features/weather/components/search.component';
import { CitiesMenu } from '../../app/features/weather/components/citiesMenu.component';
import { of } from 'rxjs';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getWeatherByCityId',
    ]);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CitySearchComponent, CitiesMenu],
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

  it('should load selectedUnits from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'selectedUnits' ? 'imperial' : null;
    });

    component.ngOnInit();
    expect(component.selectedUnits).toBe('imperial');
  });

  it('should save selectedUnits to localStorage', () => {
    spyOn(localStorage, 'setItem');

    component.selectUnits('imperial');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedUnits',
      'imperial'
    );
  });

  it('should call weatherService.getWeatherByCityId when getWeather is called', () => {
    const mockCity = { id: 123 };
    const mockWeatherData = {
      name: 'Test City',
      main: { temp: 25 },
      weather: [{ description: 'sunny' }],
    };
    weatherService.getWeatherByCityId.and.returnValue(of(mockWeatherData));

    component.getWeather(mockCity.id);

    expect(weatherService.getWeatherByCityId).toHaveBeenCalledWith(
      123,
      'metric'
    );
  });

  it('should update weather property with data from weatherService', () => {
    const mockCity = { id: 123 };
    const mockWeatherData = {
      name: 'Test City',
      main: { temp: 25 },
      weather: [{ description: 'sunny' }],
    };
    weatherService.getWeatherByCityId.and.returnValue(of(mockWeatherData));

    component.getWeather(mockCity.id);

    expect(component.weather).toEqual(mockWeatherData);
  });
});
