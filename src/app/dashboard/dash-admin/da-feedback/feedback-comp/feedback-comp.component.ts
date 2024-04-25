import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { FeedbackService } from '../../../../app-services/feedback.service';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-feedback-comp',
  standalone: true,
  imports: [LoadingComponent, MatCardModule, MatExpansionModule],
  templateUrl: './feedback-comp.component.html',
  styleUrl: './feedback-comp.component.css'
})
export class FeedbackCompComponent implements OnInit {
  compliments: any = {};
  loading: Boolean = true

  constructor(private fServe: FeedbackService) {}
  
  ngOnInit(): void {
    this.loading = true
    this.getCompFeedback();
  }
  
  async getCompFeedback() {
    const request = await this.fServe.getComplimentFeedback();
    this.compliments = request;
    console.log(request)
    this.loading = false;
  }
  

}
