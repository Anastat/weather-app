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

  /**
   * Sets selected city to localStorage and emit event to parent.
   * 
   * @param selectedCity object of selected city.
   */
  onCitySelect(selectedCity: any) {
    // TODO: Create utils function to set and get LocalStorage item.
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
    this.selectCity.emit(selectedCity);
  }
}
