import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '../../../app-services/userProfile.service';

@Component({
  selector: 'app-du-profile',
  standalone: true,
  imports: [FormsModule, 
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatButtonModule,
            ],
  templateUrl: './du-profile.component.html',
  styleUrl: './du-profile.component.css'
})
export class DuProfileComponent implements OnInit {
  @Input() Profile;
  updateCheck = false;
  
  profileForm: FormGroup<any>;
  //  = new FormGroup({
    // firstName: new FormControl(''),
    // lastName: new FormControl(''),})

  user = [{"_id":"6561ac9c66bff91aa86f2443","u_id":{"$numberInt":"1135"},"u_phone":"5555555555","u_email":"ab@lincoln.com","u_street":"555 Fifth Ave","u_city":"Five Town","u_state":"Utah","u_country":"United States","u_zip":"84084","u_username":"Tester","u_fname":"Abraham","u_lname":"Lincoln","u_priv":"1","u_pass":"$2b$10$iKZKrn4opjVfRF7TvnFTiOQxf9ILArSrSyhUPpZ8e3o9/rrxDBDP."}]

  constructor(private formBuilder: FormBuilder,
              private uProfService: UserProfileService         
    ) {};

  ngOnInit(): void {
    this.initializeForm();
    this.populateFormData();
    // this.subscribeToFormChanges();
    console.log("duProfile: " + this.Profile);
    // this.r.params.subscribe(params => {
    //   this.u_name = params['clientUsername']
    //   this.loadUserProfile();
    // });

  }

  updateSwitch() {
    this.updateCheck = !this.updateCheck;
    console.log(this.updateCheck);
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.user && this.user.length > 0 ? this.user[0].u_fname : '', Validators.required],
      lastName: [this.user && this.user.length > 0 ? this.user[0].u_lname : '', Validators.required],
      u_email: [this.user && this.user.length > 0 ? this.user[0].u_email : '', Validators.email],
      u_username: [this.user && this.user.length > 0 ? this.user[0].u_username : '', Validators.required],
      u_street: [this.user && this.user.length > 0 ? this.user[0].u_street : ''],
      u_city: [this.user && this.user.length > 0 ? this.user[0].u_city : ''],
      u_state: [this.user && this.user.length > 0 ? this.user[0].u_state : ''],
      u_zip: [this.user && this.user.length > 0 ? this.user[0].u_zip : '']
    });
  }
  

  populateFormData() {
    if (this.user && this.user.length > 0) {
      const userData = this.user[0]; // Access the first element of the user array
      this.profileForm.patchValue({
        firstName: userData.u_fname || '',
        lastName: userData.u_lname || '',
        u_email: userData.u_email || '',
        u_username: userData.u_username || '',
        u_street: userData.u_street || '',
        u_city: userData.u_city || '',
        u_state: userData.u_state || '',
        u_zip: userData.u_zip || ''
      });
    }
}

onUpdateUserProf() {
  const payload = {
      u_fname: this.profileForm.value.firstName,
      u_lname: this.profileForm.value.lastName,
      u_email: this.profileForm.value.u_email,
      u_username: this.profileForm.value.u_username,
      u_street: this.profileForm.value.u_street,
      u_city: this.profileForm.value.u_city,
      u_state: this.profileForm.value.u_state,
      u_zip: this.profileForm.value.u_zip
      // Add other fields as needed
  };
  this.updateCheck = !this.updateCheck;
  console.log('Payload:', payload);
  // Call your method to update the array with the payload
  this.updateArrayWithPayload(payload);
}

updateArrayWithPayload(payload) {
  // To be added when connecting REST APIs
}

}
