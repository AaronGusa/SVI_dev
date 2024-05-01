import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { FeedbackService } from '../../../../app-services/feedback.service';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-feedback-feature',
  standalone: true,
  imports: [MatCardModule, LoadingComponent, MatExpansionModule],
  templateUrl: './feedback-feature.component.html',
  styleUrl: './feedback-feature.component.css'
})
export class FeedbackFeatureComponent implements OnInit{
featureRequests: any = {} ;
loading: Boolean = true

constructor(private fServe: FeedbackService) {}

ngOnInit(): void {
  this.loading = true
  this.getFeatureFeedback();
}

async getFeatureFeedback() {
  const request = await this.fServe.getFeatureFeedback();
  this.featureRequests = request;
  console.log(request)
  this.loading = false;
}

}
