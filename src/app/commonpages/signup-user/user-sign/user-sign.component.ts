import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroupDirective, NgForm, ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ServiceService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { UserService } from '../../../app-services';
import { ImageService } from '../../../app-services';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-sign',
  standalone: true,
  imports: [MatCheckboxModule, 
            LoadingComponent, 
            MatFormFieldModule, 
            MatStepperModule, 
            ReactiveFormsModule, 
            FormsModule,
            MatInputModule,
            MatButtonModule,
            MatProgressBarModule,
            MatIcon
          ],
  templateUrl: './user-sign.component.html',
  styleUrl: './user-sign.component.css'
})

export class UserSignComponent implements OnInit {
  @Output() goBusinessSignUp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userSubSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showBusinessForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clientId: EventEmitter<string> = new EventEmitter<string>();
  @Output() usernameEmit: EventEmitter<string> = new EventEmitter<string>();
  
  private _userID: string;
  private userId: any;

  business2Add: boolean = false;
  hideUserForm: boolean = false;
  userSubmitting: boolean = false;
  userSuccess: boolean = false;
  goToBusiness: boolean = false;
  usernameSearch: boolean = false;
  usernameInvalid: boolean = false;
  usernameValid: boolean = false;
  userHasText: boolean = false;

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
      u_pass: '123456',
      has_bus: true
  };

  

  constructor(private userService: UserService,
              private imageService: ImageService,
              private _formBuilder: FormBuilder,
              private r: Router) 
  { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({});
    this.business2Add = false;
    console.log(this.username_pass_form)
  }
  
  showBusinessSignUp(value) {
    console.log('showBusiness: ' + value)
    this.business2Add = value;
    this.goBusinessSignUp.emit(this.business2Add);
  };

  goToBusinessSignUp() {
    // When called, this function will navigate the user to the routerLink="/sign-up/business" page
    this.business2Add = !this.business2Add;
    this.goBusinessSignUp.emit(this.business2Add);
}
// User Only
  // async CompleteUserSign() {
  //   // If business2Add is true, this function will call the processUserSignUp() function
  //   // If successful, then will call the goToBusinessSignUp() function
    
  //     let u_username = this.username_pass_form.get('u_username').value;
  //     let u_pass = this.username_pass_form.get('u_pass').value;
    
    
  //     let u_fname = this.person_info_form.get('u_fname').value;
  //     let u_lname = this.person_info_form.get('u_lname').value;
  //     let u_phone = this.person_info_form.get('u_phone').value; 
  //     let u_email = this.person_info_form.get('u_email').value; 
    
  //     let u_street = null;
  //     let u_city = null;
  //     let u_state = null;
  //     let u_country = null;
  //     let u_zip = null;
    
     
  //     this.userForm = this._formBuilder.group({
  //       u_username: u_username,
  //       u_pass: u_pass,
  //       u_fname: u_fname,
  //       u_lname: u_lname,
  //       u_phone: u_phone,
  //       u_email: u_email,
  //       u_street: u_street,
  //       u_city: u_city,
  //       u_state: u_state,    
  //       u_country: u_country,
  //       u_zip: u_zip
  //     });


  //   this.processUserSignUp();

  //   const username = this.username_pass_form.get('u_username').value.toLowerCase();
      
      
  //       const profCompleted = await this.createProfileImagesEntry(this.userId);
  //       console.log('profCompleted' + Object.values(profCompleted));
        
  //       if (profCompleted.acknowledged === true ) {
  //         this.r.navigate([`/dashboard/${username}`]);
  //       } else {
  //         console.log('Wuh HOOO')
  //       }
    
  // }

  async CompleteUserSign() {
    // If business2Add is true, this function will call the processUserSignUp() function
    // If successful, then will call the goToBusinessSignUp() function
    
    let u_username = this.username_pass_form.get('u_username').value;
    let u_pass = this.username_pass_form.get('u_pass').value;


    let u_fname = this.person_info_form.get('u_fname').value;
    let u_lname = this.person_info_form.get('u_lname').value;
    let u_phone = this.person_info_form.get('u_phone').value; 
    let u_email = this.person_info_form.get('u_email').value; 

    let u_street = null;
    let u_city = null;
    let u_state = null;
    let u_country = null;
    let u_zip = null;
    let has_bus = false;

    


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
        u_zip: u_zip,
        has_bus: has_bus
    });

    
    // Call the processUserSignUp function
    await this.processUserSignUp();
    console.log('Got past processUserSignUp in user only sign up')
    // Get the username from the form
    const username = this.username_pass_form.get('u_username').value.toLowerCase();
    this.usernameEmit.emit(username);
    
    // Call createProfileImagesEntry and await its response
    const profCompleted = await this.createProfileImagesEntry(this.userId);
    console.log('profCompleted', JSON.stringify(profCompleted));
  
    // Check if profile creation was successful
    if (profCompleted && profCompleted.acknowledged === true ) {
        // Navigate to the dashboard
        this.r.navigate([`/dashboard/${username}`]);
        console.log('WE HAVE IT BOYS AND GIRLS')
    } else {
        console.log('Wuh HOOO');
    }
}

  async processUserSignUp() {
    // // When called, this function will process the user's sign up information and POST it to the backend
    this.userSubmitting = true;
    
    // Get the user data from this.userForm
    try {
      // Get the user data from this.userForm
      const userData = this.userForm.value;
      console.log('UserDATA line 238: ' + Object(userData));
  
      // Call the postUsers function to send the user data to the backend
      const response: any = await this.userService.postUser(userData);
      // Handle successful user creation response here
      if (response && response.hasOwnProperty('acknowledged')) {
        // Handle successful user creation response here
        
        
        if (response.acknowledged === true) {
          //Conditions
          this.userSuccess = true;
          this.userSubmitting = false;
          this.goToBusiness = this.goToBusiness;
          this._userID = response.insertedId;
          
          //Emitters
          this.userSubSuccess.emit(this.userSuccess);
          //this.showBusinessForm.emit(this.goToBusiness);
          this.clientId.emit(this._userID);
          console.log(
            //'Emitted: userSubSuccess: ', this.userSuccess,
           // 'Emitted: showBusinessForm: ', this.goToBusiness,
           'Emitted: clientId: ', this._userID
         )

        this.userId = response.userId;
          
          
          
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

  async checkUsernameAvailability() {
    try {
      this.usernameSearch = false;
      this.usernameInvalid= false;
      this.usernameValid = false;
      const username = this.username_pass_form.get('u_username').value.toLowerCase();
      if (username===null || username.length === 0) {
        this.usernameSearch = false;
        return;
      } else {
        this.usernameSearch = true;
      }

    
      const response: any = await this.userService.verifySignUpUsername(username);
      if (response === true) {
        console.log(response);
        console.log('Response length equals zero entered');
        this.usernameSearch = false;
        this.usernameValid = true;
        this.usernameInvalid = false;
        this.username_pass_form.patchValue({
          u_username: username
        });  
      } else {
        console.log('Response length does not equal zero entered');
        console.log(response);

        this.usernameSearch = false;
        this.usernameInvalid = true;
        this.usernameValid = false;
      }
    } catch (error) {
      // this.username_pass_form.get('u_username').reset();
      throw error;
    }
  }

  clearUsernameAttempt() {
    this.username_pass_form.patchValue({
      u_username: '' // Set the value of u_username to an empty string
    });
  
    // Manually blur the input field
    const inputElement = document.getElementById('u_username');
    if (inputElement) {
      inputElement.blur();
    }
  }

  hasText(): boolean {
    const usernameValue = this.username_pass_form.get('u_username').value;
    return usernameValue && usernameValue.trim().length > 0;
  }

  createProfileImagesEntry(userId: number) {
    return this.imageService.signUpUserCreate(userId);
  }

  async CompleteUserSignAndGoBus() {
    // If business2Add is true, this function will call the processUserSignUp() function
    // If successful, then will call the goToBusinessSignUp() function
    
    let u_username = this.username_pass_form.get('u_username').value;
    let u_pass = this.username_pass_form.get('u_pass').value;


    let u_fname = this.person_info_form.get('u_fname').value;
    let u_lname = this.person_info_form.get('u_lname').value;
    let u_phone = this.person_info_form.get('u_phone').value; 
    let u_email = this.person_info_form.get('u_email').value; 

    let u_street = null;
    let u_city = null;
    let u_state = null;
    let u_country = null;
    let u_zip = null;
    let has_bus = true;


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
        u_zip: u_zip,
        has_bus: has_bus
    });

    // Call the processUserSignUp function
    await this.processUserSignUp();

    // Get the username from the form
    const username = this.username_pass_form.get('u_username').value.toLowerCase();
    this.usernameEmit.emit(username);
    // Call createProfileImagesEntry and await its response
    const profCompleted = await this.createProfileImagesEntry(this.userId);
    //console.log('profCompleted', JSON.stringify(profCompleted));
  
    // Check if profile creation was successful
    if (profCompleted && profCompleted.acknowledged === true ) {
        // Navigate to the business form
      //  this.goToBusinessSignUp();
      //emitters for business sign up
        this.goBusinessSignUp.emit(true);
        this.showBusinessForm.emit(true);
    } else {
        console.log('Wuh HOOO');
    }
  }


}