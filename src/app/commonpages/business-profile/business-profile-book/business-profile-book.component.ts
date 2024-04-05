import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CalendarComponent } from '../../../commonelements/calendar/calendar.component';
import { LoadingComponent } from '../../../features/loading/loading.component';

@Component({
  selector: 'app-business-profile-book',
  standalone: true,
  imports: [MatButtonToggleModule, CalendarComponent, LoadingComponent],
  templateUrl: './business-profile-book.component.html',
  styleUrl: './business-profile-book.component.css'
})
export class BusinessProfileBookComponent implements OnInit, OnChanges{
  @Input() servComplete: any = [];
  isLoading: Boolean = true;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.servComplete !== undefined) {
      this.isLoading = false;
    }
  }
}
