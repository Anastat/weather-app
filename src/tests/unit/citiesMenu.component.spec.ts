import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesMenu } from '../../app/features/weather/components/citiesMenu.component';

describe('CitiesMenuComponent', () => {
  let component: CitiesMenu;
  let fixture: ComponentFixture<CitiesMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesMenu);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectCity event with city when onSelectCity is called', () => {
    spyOn(component.selectCity, 'emit');
    const mockCity = { name: 'Test City', id: 123 };

    component.onCitySelect(mockCity);

    expect(component.selectCity.emit).toHaveBeenCalledWith(mockCity);
  });
});
