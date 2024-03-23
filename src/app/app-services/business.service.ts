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
  private busIDGet = '/bus/';
  private busUserGet = '/usr/';
  private busPost = 'https://stellavibe.onrender.com/businesses/newbus';
  private busPut = '/busUp/';

  constructor(private http: HttpClient) { }

  fetchBusinesses(): Observable<Business[]> { // Specify Observable with the correct type
    return this.http.get<Business[]>(this.businessUrl);
  };

  fetchBusiness(b_id: string) {
    return this.http.get(this.businessUrl + this.busIDGet + `${b_id}`);
  }

  fetchUserBusiness(u_id: number) {
    console.log(this.businessUrl + this.busUserGet + `${u_id}`)
    return this.http.get(this.businessUrl + this.busUserGet + `${u_id}`).toPromise();
  }

  postBusiness(business) {
    console.log(`${this.busPost}`);
    console.log('Line 21 of BusinessService: ', JSON.stringify(business));
    return this.http.post(`${this.busPost}`, business).toPromise();
  };

  putBusiness(b_id: number, payload) {
    return this.http.put(`${this.businessUrl}${this.busPut}${b_id}`, payload );
  }
  


}