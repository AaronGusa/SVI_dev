import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

interface AuthResponseData{

}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedIn = false;
    passwordHash: string = "";
    private tempUserValue: string = "stellavi"; 
    private tempPassValue = "Stellavi24";
    private tempPassHashed: string = "";
    //tempPassValue: string = "6833d0884cbdf610e27c2826acd316fd046cf9613a13fa38f39da6e8516da9e44aa944b4b2aee0dfa345623bc6e94b23c2b5ca053c9f4dd95ca1fee1e226e458";
    tempToken: string = '';
    tempPackage: any[] = [];

    constructor(private http: HttpClient,
                private r: Router) { }

    async login(username: string, password: string) {
        try {
            this.tempPassHashed = await this.hashPassword(this.tempPassValue);
            this.passwordHash = await this.hashPassword(password);
            
            console.log(this.passwordHash);
            console.log('Entered Password Hash:', this.passwordHash); // Log the entered password hash
            console.log('Stored Password Hash:', this.tempPassValue); // Log the stored password hash for comparison

            // Send the hashed password to the server for authentication
            // Example: this.http.post('/login', { email, password: passwordHash });
        } catch (error) {
            console.error('Error hashing password:', error);
        }

        if (username === this.tempUserValue && this.passwordHash === this.tempPassHashed) {
            console.log('Email and Password Pass')
            
            console.log(this.tempPackage);
            this.r.navigate([`/dashboard/${username}`]);
            this.loggedIn = true;
            this.tempPackage = [{ auth: this.tempToken, u_priv: 1, loggedIn: this.loggedIn}];
        } else {
            this.loggedIn = false;
            this.tempPackage = [{auth: "AUTH FAILED", u_priv: 10, loggedIn: this.loggedIn}];
            console.log('MAJOR ERROR BRO!')
            console.log(this.tempPackage)
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

     // Log out the user
  logout(): void {
    this.loggedIn = false;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}