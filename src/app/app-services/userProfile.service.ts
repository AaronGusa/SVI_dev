import { Injectable } from '@angular/core';
import { UserService } from './user.service'; // Assuming you have a UserService to fetch user data
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfileSubject = new BehaviorSubject<User | null>(null);

  constructor(private userService: UserService) {
    // No need to fetch user profile data here
  }

  async loadUserProfile(username: string) {
    try {
      const userProfile = await this.userService.fetchUsername(username);
      console.log(userProfile);
    //   this.userProfileSubject.next(userProfile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  }

  getUserProfile(): Observable<User | null> {
    return this.userProfileSubject.asObservable();
  }
}
