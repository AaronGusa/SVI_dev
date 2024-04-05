import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 


@Component({
  selector: 'app-toggle-filter',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './toggle-filter.component.html',
  styleUrl: './toggle-filter.component.css'
})
export class ToggleFilterComponent implements OnInit, AfterViewInit  {
  @Output() filterByNameChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showActiveOnlyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  sortName: boolean = false; //starts false to initiate OnInit with function onFilterByNameChange
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

  onShowActiveOnlyChange() {
    this.sortActiveOnly= !this.sortActiveOnly;
    this.showActiveOnlyChange.emit(this.sortActiveOnly);
    // this.showActiveOnlyChange.emit(this.sortActiveOnly);
    //console.log('onFilterActiveOnly changed to: ' + this.sortActiveOnly);

  }
}
