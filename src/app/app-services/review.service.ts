import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewUrl = 'https://stellavibe.onrender.com/reviews';
  private userRevs = '/usr/';
  private busRevs = '/id/';

  constructor(private http: HttpClient) { }

  async fetchReviews() {
    try {
    
      return await this.http.get(this.reviewUrl).toPromise();
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

  async getBusReviews(b_id: string) {
    try {
      const reviews = await firstValueFrom(this.http.get(`${this.reviewUrl}${this.busRevs}${b_id}`));
      return reviews;
    } catch (error) {
      return error;
    }
  }

}
