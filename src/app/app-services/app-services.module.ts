import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
//import { createWorker, encode } from '@squoosh/lib';

@Injectable({
  providedIn: 'root'
})
export class AppServices { 
  private appBaseUrl = 'https://stellavibe.onrender.com/appnt/';
  private appUsrUrl = 'usr/';
  private appAllUrl = 'a_a/';
  private appBusUrl = 'bus/';

  constructor(private http: HttpClient) {}

  async getUserApps(u_username: string) {
    try {
      console.log(`${this.appBaseUrl}${this.appUsrUrl}${u_username}`)
      const response: any = await firstValueFrom(this.http.get(`${this.appBaseUrl}${this.appUsrUrl}${u_username}`));
      if(response.length > 0) {
        return response;
      } else {
        console.log('USERNAME APPNTMENT ERROR: ' + response)
        return response;
      }
    } catch (error) {
      return error;
    }
  }

  async getBusApps(b_id: string) {
    try {
      //console.log(`${this.appBaseUrl}${this.appBusUrl}${b_id}`)
      const response: any = await firstValueFrom(this.http.get(`${this.appBaseUrl}${this.appBusUrl}${b_id}`));
      if(response.length > 0) {
        return response;
      } else {
        console.log('Business ID APPNTMENT ERROR: ' + response)
        return response;
      }
    } catch (error) {
      return error;
    }
  }


}
