//@ts-nocheck
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

//Models
import { Business } from '../../../../models/business.model';
import { Category } from '../../../../models/category.model';



@Component({
  selector: 'app-zip-search',
  standalone: true,
  imports: [MatExpansionModule, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule ],
  templateUrl: './zip-search.component.html',
  styleUrl: './zip-search.component.css'
})
export class ZipSearchComponent {
    //Inputs Outputs
  @Input() businesses!: Business[];
  @Input() categories!: Category[];
  @Input() zip!: any[];
  @Output() zipSelected: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('auto') auto!: MatAutocompleteModule;
  

  //Variables
  zipListFiltered: any[] = [];
  zipPicking: any = '';
  myControl = new FormControl('');

  onZipSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    if (inputValue.trim() === '' || !inputValue) {
      this.zipListFiltered = this.zip;

    } else {
      this.zipListFiltered = this.zip.filter(zipValue =>
        zipValue.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    // Emit the filtered zip list
    this.zipSelected.emit(inputValue);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedZip = event.option.viewValue;
    console.log(selectedZip)
    //this.onZipSelected(selectedZip);
  }
}
