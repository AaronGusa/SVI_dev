import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  
  export class FeedbackService {
    private feedBaseURL = 'https://stellavibe.onrender.com/feedback/';
    private featureURL = 'feedback';
    private complimentURL = 'likes';
    private suggestURL = 'suggest';
    private postURL = 'postFeed';

    constructor(private http: HttpClient) {}

    async getAllFeedback() {
      try {
        const response1 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.featureURL}`));
        // Validate
        console.log(response1)
        
        const response2 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.complimentURL}`));
        console.log(response2);

        const response3 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.suggestURL}`));
        console.log(response3);

      } catch (err) {
        console.log("There was a feedback error.")
      }

    }

    async getFeatureFeedback() {
      const response1 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.featureURL}`));
        // Validate
        //console.log(response1)

        return response1;
    }

    async getComplimentFeedback() {
      const response2 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.complimentURL}`));
        // Validate
        //console.log(response2)

        return response2;
    }

    async getSuggestionFeedback() {
      const response3 = await firstValueFrom(this.http.get(`${this.feedBaseURL}${this.suggestURL}`));
      // Validate
      //console.log(response3)

      return response3;
    }


    async postFeedback(payload) {
      try {
        const response = firstValueFrom(this.http.post(`${this.feedBaseURL}${this.postURL}`, payload));
        console.log('Feedback Post Response:')
        console.log(response)

      } catch (err) {

      }
     }


  }