import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = 'https://stellavibe.onrender.com/reviews';
  private userRevs = '/usr/';

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

  async getUserReviews(id: number) {
    try {
      const reviews = await this.http.get(`${this.reviewUrl}${this.userRevs}${id}`).toPromise();
      return reviews;
    } catch (error) {
      return error;
    }
  }

}
