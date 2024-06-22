import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatCardModule, MatInputModule, MatFormFieldModule, DatePipe, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  DAY_MS = 60 * 60 * 24 * 1000;
  dates: Array<Date>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = new Date();
  @Output() selected = new EventEmitter();
  @Output() selectedDate: any;
  cssDateSelected: any;

  constructor() {
    this.dates = this.getCalendarDays(this.date);
  }

  setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.date);
  }
  
  isSameMonth(date) {
    return date.getMonth() === this.date.getMonth();
  }

  private getCalendarDays(date = new Date) {
    const calendarStartTime =  this.getCalendarStartDay(date).getTime()
    + 60 * 60 * 2 * 1000;

    return this.range(0, 41)
      .map(num => new Date(calendarStartTime + this.DAY_MS * num));
  }

  private getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - this.DAY_MS * num))
      .find(dt => dt.getDay() === 0)
  }

  private range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    //console.log('SELECTED ' + this.selectedDate);
    // this.selected = this.selectedDate;
    this.selected.emit(this.selectedDate);
    //console.log(this.selected)
  }
  
  isSelectedDate(date: Date): boolean {
    return this.selectedDate === date;
  }



}