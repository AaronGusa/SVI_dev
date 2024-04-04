import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';

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
  fetchCategories(): Observable<Category[]> {
    return new Observable(observer => {
      const subscription = this.http.get<Category[]>(this.serviceUrl)
        .subscribe({
          next: categories => observer.next(categories),
          error: error => observer.error(error),
          complete: () => observer.complete()
        });
  
      
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    });
  }

  fetchServicesSub() {
    return new Observable(observer => {
      const subscription = this.http.get<Category[]>(this.categoryUrl)
        .subscribe({
          next: categories => observer.next(categories),
          error: error => observer.error(error),
          complete: () => observer.complete()
        });
  
      
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    });
  }

  fetchServices() {
    return this.http.get<Service[]>(this.serviceUrl)
  };

  fetchSID(s_id) {
    return this.http.get(`${this.serviceUrl}${this.servId}${s_id}`).toPromise();
  }


}
