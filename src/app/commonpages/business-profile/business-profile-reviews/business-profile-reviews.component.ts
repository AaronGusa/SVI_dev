import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

import { ReviewService } from '../../../app-services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-business-profile-reviews',
  standalone: true,
  imports: [MatButton, MatCardModule, MatExpansionModule, DatePipe],
  templateUrl: './business-profile-reviews.component.html',
  styleUrl: './business-profile-reviews.component.css'
})
export class BusinessProfileReviewsComponent implements OnChanges, OnInit {
@Input() b_id: string;
reviews: any;


constructor (private rServe: ReviewService ) {}

ngOnInit(): void {
  //console.log(this.b_id)
  if(this.b_id !== undefined) {
    this.getReviews();
  }
}

ngOnChanges(changes: SimpleChanges): void {
  this.getReviews();
}

async getReviews() {
  
  this.reviews = await this.rServe.getBusReviews(this.b_id);
  //console.log(this.reviews)
}

buildReview() {

}

}
