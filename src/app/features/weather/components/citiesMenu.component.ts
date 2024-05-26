import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cities-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citiesMenu.component.html',
  styleUrls: ['./citiesMenu.component.css'],
})
export class CitiesMenu {
  @Input() cities: any[] = [];
  @Output() selectCity = new EventEmitter<any>();

  onCitySelect(selectedCity: any) {
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
    this.selectCity.emit(selectedCity);
  }
}
