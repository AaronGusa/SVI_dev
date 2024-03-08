import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { UserService } from '../../../app-services';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-user-sign',
  standalone: true,
  imports: [MatCheckboxModule, LoadingComponent, MatFormFieldModule, MatStepperModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './user-sign.component.html',
  styleUrl: './user-sign.component.css'
})
export class UserSignComponent implements OnInit {
  @Output() goBusinessSignUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userSubSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showBusinessForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clientId: EventEmitter<string> = new EventEmitter<string>();
  
  private _userID: string;
  
  business2Add: boolean = false;
  hideUserForm: boolean = false;
  userSubmitting: boolean = false;
  userSuccess: boolean = false;
  goToBusiness: boolean = false;
  // username_pass_form: FormGroup = this._formBuilder.group({usePassCtrl: ['']});
  // person_info_form: FormGroup = this._formBuilder.group({personInfoCtrl: ['']});
  // address_form: FormGroup = this._formBuilder.group({addressCtrl: ['']});
  username_pass_form: FormGroup = this._formBuilder.group({
    u_username: [null],
    u_pass: [null]
  });
  
  person_info_form: FormGroup = this._formBuilder.group({
    u_fname: new FormControl(null, Validators.required),
    u_lname: new FormControl(null, Validators.required),
    u_phone: new FormControl(null, Validators.required),
    u_email: new FormControl(null, [Validators.required, Validators.email]),
  });
  
  address_form: FormGroup = this._formBuilder.group({
    u_street: new FormControl(null, Validators.required),
    u_city: new FormControl(null, Validators.required),
    u_state: new FormControl(null, Validators.required),
    u_country: new FormControl(null, Validators.required),
    u_zip: new FormControl(null, Validators.required),
  });
  userForm: FormGroup;
  duration: 1500;

  userModel = {
      u_phone: '555-555-5555',
      u_email: 'jane.doe@example.com',
      u_street: '456 Oak St',
      u_city: 'Anytown',
      u_state: 'Utah',
      u_country: 'USA',
      u_zip: '12345',
      u_username: 'janedoe',
      u_fname: 'Jane',
      u_lname: 'Doe',
      u_pass: '123456'
  };

  

  constructor(private userService: UserService,
              private _formBuilder: FormBuilder) 
  { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({});

    // this.username_pass_form = this._formBuilder.group({
    //   u_username: [null],
    //   u_pass: [null]
    // });
    // this.person_info_form = this._formBuilder.group({
    //   u_fname: new FormControl(null, Validators.required),
    //   u_lname: new FormControl(null, Validators.required),
    //   u_phone: new FormControl(null, Validators.required),
    //   u_email: new FormControl(null, [Validators.required, Validators.email]),
    // });
    // this.address_form = this._formBuilder.group({
    //   u_street: new FormControl(null, Validators.required),
    //   u_city: new FormControl(null, Validators.required),
    //   u_state: new FormControl(null, Validators.required),
    //   u_country: new FormControl(null, Validators.required),
    //   u_zip: new FormControl(null, Validators.required),
    // });
    console.log(this.username_pass_form)
  }
  
  showBusinessSignUp(value) {
    this.business2Add = value;
    this.goBusinessSignUp.emit(this.business2Add);
    //console.log(this.goBusinessSignUp)
  };

  goToBusinessSignUp() {
    // When called, this function will navigate the user to the routerLink="/sign-up/business" page

}

  CompleteUserSign() {
    // If business2Add is true, this function will call the processUserSignUp() function
    // If successful, then will call the goToBusinessSignUp() function
    
      let u_username = this.username_pass_form.get('u_username').value;
      let u_pass = this.username_pass_form.get('u_pass').value;
    
    
      let u_fname = this.person_info_form.get('u_fname').value;
      let u_lname = this.person_info_form.get('u_lname').value;
      let u_phone = this.person_info_form.get('u_phone').value; 
      let u_email = this.person_info_form.get('u_email').value; 
    
    
      let u_street = this.address_form.get('u_street').value;
      let u_city = this.address_form.get('u_city').value;
      let u_state = this.address_form.get('u_state').value;
      let u_country = this.address_form.get('u_country').value;
      let u_zip = this.address_form.get('u_zip').value;
    
      this.userForm = this._formBuilder.group({
        u_username: u_username,
        u_pass: u_pass,
        u_fname: u_fname,
        u_lname: u_lname,
        u_phone: u_phone,
        u_email: u_email,
        u_street: u_street,
        u_city: u_city,
        u_state: u_state,    
        u_country: u_country,
        u_zip: u_zip
      });

    //console.log(this.userForm)

    this.processUserSignUp();
    
  }

  async processUserSignUp() {
    // // When called, this function will process the user's sign up information and POST it to the backend
    this.userSubmitting = true;
    
    // Get the user data from this.userForm
    try {
      // Get the user data from this.userForm
      const userData = this.userForm.value;
      //console.log("User Password:")
      //console.log(this.userForm.value);
  
      // Call the postUsers function to send the user data to the backend
      const response: any = await this.userService.postUser(userData);
      // Handle successful user creation response here
      if (response && response.hasOwnProperty('acknowledged')) {
        // Handle successful user creation response here
        
        
        if (response.acknowledged === true) {
          //console.log('User Success:', response);
          //Conditions
          this.userSuccess = true;
          this.userSubmitting = false;
          this.goToBusiness = true;
          this._userID = response.insertedId;
          //console.log('The _userID is ', this._userID)
          
          //Emitters
          this.userSubSuccess.emit(this.userSuccess);
          this.showBusinessForm.emit(this.goToBusiness);
          this.clientId.emit(this._userID);
          //console.log(
            //'Emitted: userSubSuccess: ', this.userSuccess,
           // 'Emitted: showBusinessForm: ', this.goToBusiness,
           // 'Emitted: clientId: ', this._userID
         // )
         
        } else {
          console.log('User Failed:', response);
        }
      } else {
        console.log('Unexpected response structure:', response);
      }
      // Optionally, you can navigate to another page or perform other actions here
    } catch (error) {
      // Handle error response here
      console.error('Error creating user:', error);
    }


  }
}