import { Component, Input, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { FeedbackService } from '../../../../app-services/feedback.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-feedback-comp',
  standalone: true,
  imports: [LoadingComponent, MatCardModule, MatExpansionModule, DatePipe, MatButtonModule],
  templateUrl: './feedback-comp.component.html',
  styleUrl: './feedback-comp.component.css'
})
export class FeedbackCompComponent implements OnInit {
  @Input() u_name: string;
  
  compliments: any = {};
  loading: Boolean = true;
  read = {};
  not_read = {};


  constructor(private fServe: FeedbackService) {}
  
  ngOnInit(): void {
    this.loading = true
    this.getCompFeedback();
  }
  
  async getCompFeedback() {
    console.log("UNAME: " + this.u_name)
    const request = await this.fServe.getComplimentFeedback();
    this.compliments = request;
    
    this.loading = false;
  }

  async updateReadStatus(f_id, feedbackRead, username) {
    const payload = {
      f_id: f_id,
      feedType: 'likes',
      feedbackRead: !feedbackRead,
      readBy: username,

    };
    
    const request = await this.fServe.updateFeedbackReadStatus(payload);
    
    this.getCompFeedback();
  }

  siftReads() {
    this.read = {};
    this.not_read = {};
  
    for (const feedback of this.compliments) {
      if (feedback.feedbackRead) {
        // Add to the read array
        this.read[feedback.f_id] = feedback;
      } else {
        // Add to the not_read array
        this.not_read[feedback.f_id] = feedback;
      }
    }
  }
  

}
