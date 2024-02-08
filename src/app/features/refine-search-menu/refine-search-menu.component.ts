import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatIcon } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-refine-search-menu',
  standalone: true,
  imports: [MatSlideToggleModule, MatIcon, MatSelectModule],
  templateUrl: './refine-search-menu.component.html',
  styleUrl: './refine-search-menu.component.css'
})
export class RefineSearchMenuComponent {
  @Input() list2Sort!: any[];
  @Output() filterByNameChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ratingFilterChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() showActiveOnlyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  noSearch: boolean = true;
  sortName: boolean = true;
  sortRating: number = 0;
  sortActiveOnly: boolean = false;
  
  ngOnInit(): void {
    this.onFilterByNameChange();
  }

  onFilterByNameChange() {
    this.filterByNameChange.emit(this.sortName);
  }

  onRatingFilterChange() {
    if (this.sortName) {
    this.sortName = false;
    this.onFilterByNameChange();
    }
    this.ratingFilterChange.emit(this.sortRating);
  }
  
  onShowActiveOnlyChange() {
    this.showActiveOnlyChange.emit(this.sortActiveOnly);
    // this.showActiveOnlyChange.emit(this.sortActiveOnly);

  }
}
