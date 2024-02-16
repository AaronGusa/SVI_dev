import { Component } from '@angular/core';
import { DuProfileComponent } from './du-profile/du-profile.component'; 
import { DuReviewsComponent } from './du-reviews/du-reviews.component';
import { DuAppointComponent } from './du-appoint/du-appoint.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [DuProfileComponent,
            DuReviewsComponent,
            DuAppointComponent, 
            RouterModule, 
            
          
          ],
  templateUrl: './dash-user.component.html',
  styleUrl: './dash-user.component.css'
})
export class DashUserComponent {
  
}
