import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://stellavibe.onrender.com/users';

  constructor(private http: HttpClient) { }

  async fetchUsers() {
    try {
      const users = await this.http.get(this.userUrl).toPromise();
      return users;
    } catch (error) {
      console.error('Error Fetching Users: ', error);
      throw error;
    }
  }


  fetchUser(id: string) {
    try{
      const user = this.http.get(`${this.userUrl}/${id}`).toPromise();
      return user;
    } catch (error) {
      console.error('Error Fetching User: ', error);
      return error;
    }
  }

  async postUser(userSubmitted: any) {
    console.log(userSubmitted);
    const posted = this.http.post(this.userUrl, userSubmitted).toPromise();
    return posted;
  }

  //Login Verification
  async verifyUser(userSubmitted: any) {
    console.log(userSubmitted);
    
    // Hash the user's submitted password
    // const hashedPassword = await bcrypt.hash(userSubmitted.password, 10);
    const hashedPassword = "2349342879432!!!@"
    // Create a request body with the hashed password
    const requestBody = JSON.stringify({
      email: userSubmitted.email,
      password: hashedPassword
    });

    try {
      const response = await fetch(`${this.userUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      });

      if (response.ok) {
        const verified = await response.json();
        return verified;
      } else {
        console.error('Error Verifying User:', response.statusText);
        throw new Error('Error Verifying User');
      }
    } catch (error) {
      console.error('Error Verifying User: ', error);
      throw error;
    }
  }
}

