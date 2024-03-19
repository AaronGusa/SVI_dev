import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private categoryUrl = 'https://stellavibe.onrender.com/services/services';
  private serviceUrl = 'https://stellavibe.onrender.com/services/';
  private servId = '/servid/';

  categories: Category[] = [];
  services: Service[] = [];
  

  constructor(private http: HttpClient) { }

  // Categories services
  fetchCategories() {
    return this.http.get<Category[]>(this.categoryUrl);
  };

  fetchServices() {
    return this.http.get<Service[]>(this.serviceUrl)
  };

  fetchSID(s_id) {
    return this.http.get(`${this.serviceUrl}${this.servId}${s_id}`).toPromise();
  }


}
