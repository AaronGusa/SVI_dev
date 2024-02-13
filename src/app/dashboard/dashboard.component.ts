import { Component } from '@angular/core';
import { DashSideMenuComponent } from './dash-side-menu/dash-side-menu.component'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashSideMenuComponent,
            MatSidenavModule,
            MatButtonModule,
            MatSelectModule,
            MatFormFieldModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   u_priv = 1;
   usrlvl = 3;
   buslvl = 2;
   admin  = 1;
   u_name = "Aaron";


}
