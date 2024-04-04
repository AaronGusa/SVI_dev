import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';
// import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://stellavibe.onrender.com/users/';
  private userIDGet = 'user/';
  private usernameVerify = 'unameCheck/'
  private favUp = 'favup';
  // private userUrl = 'localhost:3000/users';


  constructor(private http: HttpClient) { }
  
  fetchUsers(): Observable<User[]> {
 //   console.log('Here ya go, entered fetchUsers()')
      return this.http.get<User[]>(this.userUrl);
    }

    
  // async fetchUsers() {
  //   try {
  //     const users = await this.http.get(this.userUrl);
  //     return users;
  //   } catch (error) {
  //     console.error('Error Fetching Users: ', error);
  //     throw error;
  //   }
  // }

  async fetchUserID(id: string) {
    try{
      id = id.toString();
      // console.log(typeof id)
      const fetchedUser = await firstValueFrom(this.http.get(`${this.userUrl}${this.userIDGet}${id}`));
      // console.log(`${this.userUrl}${this.userIDGet}${id}`)
      // console.log(`Fetched User Data: ${fetchedUser}`)
      return fetchedUser; 
    } catch (error) {
      console.error(`Error Fetching User ${id}: `, error);
      throw error;
    }
  }


  fetchUser(id: string) {
    try{
      const user = this.http.get(`${this.userUrl}${id}`).toPromise();
      return user;
    } catch (error) {
      console.error('Error Fetching User: ', error);
      return error;
    }
  }

  async fetchUsername(username: string) {
    try {
      // Make a GET request to retrieve user profile via username
      const response = await firstValueFrom(this.http.get(`${this.userUrl}/uname/${username}`));
      //console.log(response);
      if (response) {
  ;
          return response;
        } else {
          const Error = JSON.stringify({error:'Error Verifying Username: '+ username});
          return Error;
        }
      } catch (error) {
          // Handle errors
          console.error('Error checking username availability:', error);
          throw error;
      }
    }
  

  async postUser(userSubmitted: any) {
    try {
    console.log("UserSubmitted" + userSubmitted);
    const posted = await this.http.post(this.userUrl, userSubmitted).toPromise();
    console.log("Posted" + posted);
    return posted; 
  } catch (error) {
    throw error;
  }};

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

  //SignUp User Verification

  // async verifySignUpUsername(username: string) {
  //   try {
  //   // Make a GET request to check if the username is available
  //   const response = await this.http.get(`${this.userUrl}/uname/${username}`).toPromise();
  //   console.log("Verify Response: " + response);
  //   if (response.status === 400) {

  //       // Handle the response here
  //       // console.log(response.length);
  //       //console.log(response);
  //       //console.log(response);
  //       return response;
  //     } else {
  //       const Error = JSON.stringify({error:'Error Verifying Username: '+ username});
  //       return Error;
  //     }
  //   } catch (error) {
  //       // Handle errors
  //       console.error('Error checking username availability:', error);
  //       throw error;
  //   }
  // }

  async verifySignUpUsername(username: string) {
    try {
        // Make a GET request to check if the username is available
        const response: any = await this.http.get(`${this.userUrl}${this.usernameVerify}${username}`).toPromise();

        if (response.usernameFound === true) {
            // Username exists, so return false
            return false;
        } else if (response.usernameFound === false) {
            // Username doesn't exist, so return true
            return true;
        }
    } catch (error) {
        // Handle errors
        if (error.status === 400) {
            return error;
        } else {
            // Log the error
            console.error('Error checking username availability:', error);
            // Optionally rethrow the error if you want it to propagate further
            // throw error;
            // You can also handle the error in another way, such as returning an error flag
            return { error: true };
        }
    }
  }

  async favoriteUpdate(u_id: number, b_id: string) {
    const body = { "u_id": u_id, "b_id": b_id };
    try {
        const response: any = await this.http.put(`${this.userUrl}${this.favUp}`, body).toPromise();
        console.log('Favorite update successful:', response);
        return response; // Return the response for further processing if needed
    } catch (error) {
        console.error('Error updating favorite:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
  }


}

