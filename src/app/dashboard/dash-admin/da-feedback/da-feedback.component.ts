import { Component, OnInit, Input, Output } from '@angular/core';
import { FeedbackService } from '../../../app-services/feedback.service';
import { FeedbackFeatureComponent } from './feedback-feature/feedback-feature.component';
import { FeedbackCompComponent } from './feedback-comp/feedback-comp.component';
import { FeedbackSuggestComponent } from './feedback-suggest/feedback-suggest.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-da-feedback',
  standalone: true,
  imports: [
    FeedbackFeatureComponent,
    FeedbackCompComponent,
    FeedbackSuggestComponent,
    MatTabsModule
  ],
  templateUrl: './da-feedback.component.html',
  styleUrl: './da-feedback.component.css'
})
export class DaFeedbackComponent implements OnInit{
u_name: string;
@Output() u_name_out: string;

constructor(
    private fServe: FeedbackService,
    private r: ActivatedRoute,
) {}

ngOnInit(): void {
  // Grab username from params
    this.r.parent.parent.params.subscribe(params => {
      //console.log("r params " + params['clientUsername']);
      this.u_name = params['clientUsername'];
    });
  this.u_name_out = this.u_name;
  console.log("Feedback Loaded " + this.u_name_out)

}



}
