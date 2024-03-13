import { Injectable } from '@angular/core';
import { UserService } from './user.service'; // Assuming you have a UserService to fetch user data
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfileSubject = new BehaviorSubject<User | null>(null);
  private usernameURL = 'https://stellavibe.onrender.com/users';

  constructor(private http: HttpClient) {
  }

  async getUsername(username: string) {
    let user = await this.http.get(`${this.usernameURL}/uname/${username}`).toPromise();
    // user[0].assignments.splice(0,1);
    let userInfo = JSON.stringify(user);
    console.log(typeof userInfo)
    return userInfo;
  }

  // loadUserProfile(username: string) {
  //   try {
  //     const userProfile = this.userService.fetchUsername(username);
  //     console.log(userProfile);
  //     return userProfile;
  //   //   this.userProfileSubject.next(userProfile);
  //   } catch (error) {
  //     console.error('Failed to fetch user profile:', error);
  //     return error;
  //   }
  // }

  // getUserProfile(): Observable<User | null> {
  //   return this.userProfileSubject.asObservable();
  // }

  // async fetchUsername(username: string) {
  //   try {
  //     // Make a GET request to retrieve user profile via username
  //     const response = await this.http.get(`${this.userUrl}/uname/${username}`).toPromise();
  //     //console.log(response);
  //     if (response) {
  
  //         // Handle the response here
  //         let responseJSON = JSON.stringify(response)
  //         // console.log(response.length);
  //         //console.log(response);
  //         //console.log(response);
  //         return responseJSON;
  //       } else {
  //         const Error = JSON.stringify({error:'Error Verifying Username: '+ username});
  //         return Error;
  //       }
  //     } catch (error) {
  //         // Handle errors
  //         console.error('Error checking username availability:', error);
  //         throw error;
  //     }
  //   }
}
