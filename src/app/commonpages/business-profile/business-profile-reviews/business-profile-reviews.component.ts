import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-business-profile-reviews',
  standalone: true,
  imports: [MatButton],
  templateUrl: './business-profile-reviews.component.html',
  styleUrl: './business-profile-reviews.component.css'
})
export class BusinessProfileReviewsComponent {
reviews: any;
}
