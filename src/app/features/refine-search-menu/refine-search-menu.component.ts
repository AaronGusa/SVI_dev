import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-refine-search-menu',
  standalone: true,
  imports: [MatSlideToggleModule, 
            MatIcon, 
            MatSelectModule, 
            MatFormFieldModule, 
            MatIconModule, 
            MatInputModule],
  templateUrl: './refine-search-menu.component.html',
  styleUrl: './refine-search-menu.component.css'
})
export class RefineSearchMenuComponent implements OnInit{
  @Input() list2Sort!: any[];
  @Output() filterByNameChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ratingFilterChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() showActiveOnlyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  noSearch: boolean = true;
  sortName: boolean = false; //starts false to initiate OnInit with function onFilterByNameChange
  sortRating: number = 0;
  sortActiveOnly: boolean = true; 
  
  ngOnInit(): void {
    this.onFilterByNameChange();

  }

  onFilterByNameChange() {
    this.sortName = !this.sortName; //sortName boolean switch 
    this.filterByNameChange.emit(this.sortName);
    console.log('onFilterNAME changed to: ' + this.sortName);
  }

  onRatingFilterChange() {
    // if (this.sortName) {
    // // this.sortName = false;
    // this.onFilterByNameChange();
    // }
    // this.sortRating = rating;
    console.log('RATING: ' + this.sortRating);
    this.ratingFilterChange.emit(this.sortRating);
  }
  
  onShowActiveOnlyChange() {
    this.sortActiveOnly= !this.sortActiveOnly;
    this.showActiveOnlyChange.emit(this.sortActiveOnly);
    // this.showActiveOnlyChange.emit(this.sortActiveOnly);
    //console.log('onFilterActiveOnly changed to: ' + this.sortActiveOnly);

  }
}
