import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-db-profile',
  standalone: true,
  imports: [
            FormsModule, 
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatButtonModule,
            MatCheckboxModule
            ],
  templateUrl: './db-profile.component.html',
  styleUrl: './db-profile.component.css'
})
export class DbProfileComponent implements OnInit {
  
  business = {"_id":"64cac0ceeef1b2bf990b6623",
              "b_id":"23-0007",
              "b_name":"Nailed It!",
              "b_discipline":{"$numberInt":"4"},
              "b_street":"7890 W 5678 N",
              "b_city":"Kearns",
              "b_state":"UT",
              "b_zip":"84120",
              "b_phone":"801-555-7777",
              "b_email":"nailedit@example.com",
              "b_website":"www.nailedit.com",
              "b_services":[{"$numberInt":"1002"},{"$numberInt":"2002"},{"$numberInt":"3002"}],
              "b_rating":{"$numberDouble":"3.7"},
              "b_active":true,
              "u_id":{"$numberInt":"1007"},
              "created":"2023-08-01T18:00:00.000Z"}

  updateCheck = false;
  
  bProfileForm: FormGroup<any>;


  constructor(private formBuilder: FormBuilder) {};

  ngOnInit(): void {
    this.initializeForm();
    this.populateFormData();
  }

  updateSwitch() {
    this.updateCheck = !this.updateCheck;
    console.log(this.updateCheck);
  }

  initializeForm() {
    this.bProfileForm = this.formBuilder.group({
      b_name: [this.business  ? this.business.b_name : ''],
      b_email: [this.business  ? this.business.b_email : '', Validators.email],
      b_phone: [this.business  ? this.business.b_phone : '', Validators.required],
      b_website: [this.business  ? this.business.b_website : ''],
      b_street: [this.business  ? this.business.b_street : ''],
      b_city: [this.business  ? this.business.b_city : ''],
      b_state: [this.business  ? this.business.b_state : ''],
      b_zip: [this.business  ? this.business.b_zip : ''],
      b_active: [this.business ? this.business.b_active : '']
    });
  }
  

  populateFormData() {
    if (this.business) {
        const businessData = this.business; // Access the first element of the business array
        this.bProfileForm.patchValue({
            b_name: businessData.b_name || '',
            b_phone: businessData.b_phone || '',
            b_email: businessData.b_email || '',
            b_website: businessData.b_website || '',
            b_street: businessData.b_street || '',
            b_city: businessData.b_city || '',
            b_state: businessData.b_state || '',
            b_zip: businessData.b_zip || '',
            b_active: businessData.b_active || false // b_active is a boolean field
            // Add other fields as needed
        });
    }
}

onUpdateUserProf() {
  const payload = {
      b_name: this.bProfileForm.value.b_name,
      b_phone: this.bProfileForm.value.b_phone,
      b_email: this.bProfileForm.value.b_email,
      b_website: this.bProfileForm.value.b_website,
      b_street: this.bProfileForm.value.b_street,
      b_city: this.bProfileForm.value.b_city,
      b_state: this.bProfileForm.value.b_state,
      b_zip: this.bProfileForm.value.b_zip,
      b_active: this.bProfileForm.value.b_active
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
