import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

// model imports
import { Business } from '../../../../models/business.model';
import { Service } from '../../../../models/service.model';
import { Category } from '../../../../models/category.model';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [MatAutocompleteModule, MatExpansionModule, MatFormFieldModule, MatAutocomplete, MatInputModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {
//Inputs Outputs

@Input() cities: any[] = [];
@Output() citySelected: EventEmitter<string> = new EventEmitter<string>();
@ViewChild('auto') auto!: MatAutocompleteModule;


//Variables
cityListFiltered: any[] = [];
myControl = new FormControl('');


onCitySelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const inputValue = target.value;


  if (inputValue.trim() === '' || !inputValue) {
    this.cityListFiltered = this.cities;

  } else {
    this.cityListFiltered = this.cities.filter(cityValue =>
      cityValue.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  // Emit the filtered zip list
  this.citySelected.emit(inputValue);
}

onOptionSelected(event: MatAutocompleteSelectedEvent) {
  const selectedCity = event.option.viewValue;
  console.log(selectedCity);
  // this.onCitySelected(selectedCity);
}
}
