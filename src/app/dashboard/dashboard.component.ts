import { Component } from '@angular/core';
import { DashUserComponent } from './dash-user/dash-user.component';
import { DashBusComponent } from './dash-bus/dash-bus.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashSideMenuComponent } from './dash-side-menu/dash-side-menu.component'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashSideMenuComponent,
            MatSidenavModule,
            MatButtonModule,
            MatSelectModule,
            MatFormFieldModule,
            DashUserComponent, 
            DashBusComponent,
            DashAdminComponent,
            RouterOutlet
          ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   u_priv = 1;
   usrlvl = 3;
   buslvl = 2;
   admin  = 1;
   u_name = "Hey User";

  


}
