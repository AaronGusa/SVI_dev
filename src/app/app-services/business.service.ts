import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from '../models/business.model';
import { Observable } from 'rxjs'; // Import Observable
import { BusinessSubmit } from '../models/businessSubmit.model';

@Injectable({
  providedIn: 'root'
})

export class BusinessService {
  private businessUrl = 'https://stellavibe.onrender.com/businesses';

  constructor(private http: HttpClient) { }

 async fetchBusinesses() { 
    try {
      const businesses = await this.http.get(this.businessUrl);
      console.log(businesses);
      return businesses;
    }
    catch (error) {
      console.error('Error Fetching Businesses: ', error);
      throw error;
    }};

  postBusiness(business: BusinessSubmit): Observable<BusinessSubmit> {
    console.log('Line 21 of BusinessService: ', business);
    return this.http.post<BusinessSubmit>(this.businessUrl, business);
  };
  
}