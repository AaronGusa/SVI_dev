import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private categoryUrl = 'https://stellavibe.onrender.com/services';
  //private serviceUrl = 'https://stellavibe.onrender.com/services/services';

  categories: Category[] = [];
  services: Service[] = [];
  

  constructor(private http: HttpClient) { }

  // Categories services
  fetchCategories() {
    return this.http.get<Category[]>(this.categoryUrl);
  };


  


}
