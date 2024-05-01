import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { FeedbackService } from '../../../../app-services/feedback.service';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-feedback-suggest',
  standalone: true,
  imports: [LoadingComponent, MatCardModule, MatExpansionModule],
  templateUrl: './feedback-suggest.component.html',
  styleUrl: './feedback-suggest.component.css'
})
export class FeedbackSuggestComponent implements OnInit{
  suggestions: any = {};
  loading: Boolean = true;


  constructor(
    private fServe: FeedbackService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.getSuggFeedback();
  }

  async getSuggFeedback() {
    const request = await this.fServe.getSuggestionFeedback();
    this.suggestions = request;
    console.log(request)
    this.loading = false;
  }

}
