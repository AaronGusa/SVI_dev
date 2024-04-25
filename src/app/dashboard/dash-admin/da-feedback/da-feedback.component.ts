import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../app-services/feedback.service';
import { FeedbackFeatureComponent } from './feedback-feature/feedback-feature.component';
import { FeedbackCompComponent } from './feedback-comp/feedback-comp.component';
import { FeedbackSuggestComponent } from './feedback-suggest/feedback-suggest.component'

@Component({
  selector: 'app-da-feedback',
  standalone: true,
  imports: [
    FeedbackFeatureComponent,
    FeedbackCompComponent,
    FeedbackSuggestComponent
  ],
  templateUrl: './da-feedback.component.html',
  styleUrl: './da-feedback.component.css'
})
export class DaFeedbackComponent implements OnInit{


constructor(
    private fServe: FeedbackService
) {}

ngOnInit(): void {
  
}



}
