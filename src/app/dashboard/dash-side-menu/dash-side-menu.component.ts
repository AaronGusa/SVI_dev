import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, Routes, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dash-side-menu',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './dash-side-menu.component.html',
  styleUrl: './dash-side-menu.component.css'
})
export class DashSideMenuComponent implements OnInit{
  @Input() usrlvl: number;
  @Input() u_priv: number;
  @Input() buslvl: number;
  @Input() admin: number;
  @Input() u_name: string;
  @Input() profile: string;
  @Input() _uPriv: EventEmitter<number>; // Declare _uPriv as an EventEmitter
  @Input() data: any;

  constructor() {}

  ngOnInit() {
   console.log('Profile: ' + this.profile)
  }

  ngOnDestroy() {
   
  }
}