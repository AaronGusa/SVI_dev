import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rating-filter',
  standalone: true,
  imports: [MatSlideToggleModule, 
    MatIcon, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule],
  templateUrl: './rating-filter.component.html',
  styleUrl: './rating-filter.component.css'
})
export class RatingFilterComponent implements AfterViewInit {
  @Input() list2Sort!: any[];
  @Output() filterByNameChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ratingFilterChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() showActiveOnlyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  noSearch: boolean = true;
  sortName: boolean = false; //starts false to initiate OnInit with function onFilterByNameChange
  sortRating: number = 0;
  sortActiveOnly: boolean = false; //starts false to initiate OnInit with function sortActiveOnly
  
  ngOnInit(): void {
    this.onFilterByNameChange();
  }

  ngAfterViewInit(): void {
    // Use setTimeout to defer the execution of the function until after the current change detection cycle
    setTimeout(() => {
      this.onShowActiveOnlyChange();
    });
  }
  

  onFilterByNameChange() {
    this.sortName = !this.sortName; //sortName boolean switch 
    this.filterByNameChange.emit(this.sortName);
    //console.log('onFilterNAME changed to: ' + this.sortName);
  }

  onRatingFilterChange(rating: number) {
    if (this.sortRating === rating) {
        this.sortRating = 0; // Reset the filter
    } else {
        this.sortRating = rating;
    }
    
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
