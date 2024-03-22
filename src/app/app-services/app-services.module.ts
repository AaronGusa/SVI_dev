import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { createWorker, encode } from '@squoosh/lib';

@Injectable({
  providedIn: 'root'
})
export class AppServices { 
  private appBaseUrl = 'https://stellavibe.onrender.com/appnt/';
  private appUsrUrl = 'usr/';
  private appAllUrl = 'a_a/';

  constructor(private http: HttpClient) {}

  getUserApps(u_username: string) {
    try {
      console.log(`${this.appBaseUrl}${this.appUsrUrl}${u_username}`)
      const response: any = this.http.get(`${this.appBaseUrl}${this.appUsrUrl}${u_username}`).toPromise();
      if(response.acknowledged === true) {
        return response;
      } else {
        console.log('USERNAME APPNTMENT ERROR: ' + response)
        return response;
      }
    } catch (error) {
      return error;
    }
  }


}
