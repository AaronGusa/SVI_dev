import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dash-landing',
  standalone: true,
  imports: [RouterLink, RouterModule, MatCardModule],
  templateUrl: './dash-landing.component.html',
  styleUrl: './dash-landing.component.css'
})
export class DashLandingComponent {
  @Input() usrlvl: number;
  userlinks: any[] = [
    {'profile':'user/profile'},
    {'appointments': 'user/appointments'},
    {'reviews': 'user/reviews'}
  
  ];
  businesslinks: any[] =[
    {'profile': "business/profile"},
    {'appoinntments': "business/appointments"},
    {'reviews': "business/reviews"},
    {'stats': "business/stats"},


  ];
  adminlinks: any[] = [
    {'profile': "business/profile"},
    {'appoinntments': "business/appointments"},
    {'reviews': "business/reviews"},
    {'stats': "business/stats"},

  ];
}
