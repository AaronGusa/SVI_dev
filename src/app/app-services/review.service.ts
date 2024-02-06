import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = 'https://stellavibe.onrender.com/reviews';

  constructor(private http: HttpClient) { }

  async fetchReviews() {
    try {
      const reviews = await this.http.get(this.reviewUrl).toPromise();
      return reviews;
    } catch (error) {
      console.error('Error Fetching Reviews: ', error);
      throw error;
    }
  }
}
