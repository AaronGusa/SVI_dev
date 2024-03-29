import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../app-services';
import { BusSignComponent } from './bus-sign/bus-sign.component';
import { UserSignComponent } from './user-sign/user-sign.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-signup-user',
  standalone: true,
  imports: [RouterLink, BusSignComponent, UserSignComponent, MatButtonModule],
  templateUrl: './signup-user.component.html',
  styleUrl: './signup-user.component.css'
})
export class SignupUserComponent implements OnInit {
  goBusinessSignUp: boolean = false;
  showBusinessForm: boolean = true;
  userSubSuccess: boolean = false;
  userFound: boolean = false;
  Conditions: boolean[];
  clientId: string;
  username: string;
   _foundUser: any;
  private _foundUserID: number;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.Conditions = [this.goBusinessSignUp, this.showBusinessForm, this.userSubSuccess];
    // this.goBusinessSignUp = true;
    // this.showBusinessForm = true;
    // this.userSubSuccess = true;
  }

  goToBusiness(value: boolean) {
    //console.log('Business Go To: ', value)
    this.goBusinessSignUp = value;
    this.Conditions[0] = value;
    console.log('gotoBusiness: ' + this.username);
  }

  async handleUserId(value: string) {
    console.log('User ID passed from Child: ', value)
    try {
      this._foundUser = await this.userService.fetchUser(value);
      this.userFound = true;
      this._foundUserID = this._foundUser.u_id;
      this.clientId = this._foundUser.u_id;
      this.username = this._foundUser.u_username;

      //console.log('User Found: ', this.userFound)
      //console.log('Found User: ', this._foundUser)
    } catch (error) {
      console.log('Error Fetching User: ', error);
    }
  }

  handleBusiness2Add(value: boolean) {
    //console.log('Business 2 Add: ', value)
    this.showBusinessForm = value;
    this.Conditions[1] = value;
  }

  handleUserSuccess(value: boolean) {
    //console.log('User Success: ', value)  
    this.userSubSuccess = value;
    this.Conditions[2] = value;
  }

  handleUsername(value: string) {
    this.username = value;
  }

  happeningMan() {
    console.log('goBusinessSignUp: ', this.goBusinessSignUp)
    console.log('showBusinessForm: ', this.showBusinessForm)
    console.log('userSubSuccess: ', this.userSubSuccess)
    console.log('_foundUser: ', this._foundUser)
    console.log('userFound: ', this.userFound)
    console.log('clientId: ', this.clientId)
    console.log('_foundUserID: ', this._foundUserID)
  }

  // ConsoleLog() {
  //   console.log('WORKS')
  // }

}

