import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { DbProfileImageComponent } from './db-profile-image/db-profile-image.component';

//services needed
import { ActivatedRoute } from '@angular/router';
import { BusinessService } from '../../../app-services';
import { UserService } from '../../../app-services';
import { UserProfileService } from '../../../app-services';
import { ImageService } from '../../../app-services';


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
            LoadingComponent,
            DbProfileImageComponent,
            MatCheckboxModule
            ],
  templateUrl: './db-profile.component.html',
  styleUrl: './db-profile.component.css'
})
export class DbProfileComponent implements OnInit, OnChanges {
  
  isLoading: Boolean = true;
  u_name: any = '';
  user: any;
  u_id: number;
  b_id: string;
  business: any;
  busImages: any;
  updateCheck: Boolean = false;
  
  bProfileForm: FormGroup<any>;


  constructor(private formBuilder: FormBuilder,
              private r: ActivatedRoute,
              private bServe: BusinessService,
              private uServe: UserService,
              private uProfService: UserProfileService,
              private iServe: ImageService
              ) {};

  async ngOnInit() {
    this.isLoading = true;
    this.r.parent.parent.params.subscribe(params => {
      this.u_name = params['clientUsername']
      //console.log("DUPROFILE PARAMS? " + params['clientUsername'])
      //console.log(this.u_name)
    });
    //console.log(this.u_name);
    
    await this.showUserData();
    await this.getBusinessProfile();
    await this.getBusinessImages();
    this.initializeForm();
    this.populateFormData();
    
    this.isLoading = false;

  }

  ngOnChanges() {
    
  }
  initializeForm() {
    this.bProfileForm = this.formBuilder.group({
      b_name: [this.business  ? this.business.b_name : ''],
      b_email: [this.business  ? this.business.b_email : '', Validators.email],
      b_phone: [this.business  ? this.business.b_phone : ''],
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

onUpdateBusProf() {
  const payload = {b_name: this.bProfileForm.value.b_name,
      b_phone: this.bProfileForm.value.b_phone,
      b_email: this.bProfileForm.value.b_email,
      b_website: this.bProfileForm.value.b_website,
      b_street: this.bProfileForm.value.b_street,
      b_city: this.bProfileForm.value.b_city,
      b_state: this.bProfileForm.value.b_state,
      b_zip: this.bProfileForm.value.b_zip,
      b_active: this.bProfileForm.value.b_active};
      //console.log('b_active: ' + this.bProfileForm.value.b_active);
    // this.updateCheck = !this.updateCheck;
    // console.log('Payload:', payload);
    // Call your method to update the array with the payload
    this.updateArrayWithPayload(this.business.b_id, payload);
  }

  async showUserData() {
    try {
      let response = await this.uProfService.getUsername(this.u_name);
      if (response) {
        if (Array.isArray(response)) {
          this.user = response; // If response is already an array, assign it directly
          //console.log('Line 174 DUPROFILE COMP' + this.user);
        } else {
          // If response is not an array, try to parse it
          this.user = response;
          this.u_id = response.u_id;
        }
      } else {
        console.log('No response for showUserData');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async getBusinessProfile() {
   
      let business: any = await this.bServe.fetchUserBusiness(this.u_id);
      let storage = business.b_id;
      localStorage.setItem( 'bus', storage);
      this.business = business;

   // console.log('After the getUserandBusiness, USER: ' + JSON.stringify(this.user) + ' BUSINESS: ' + JSON.stringify(this.business));

  }

  async getBusinessImages() {
    //console.log('The business id is ' + this.business.b_id);
    this.busImages = await this.iServe.getBusProfileImage(this.business.b_id);
    //console.log(this.busImages)
  }

  updateSwitch() {
    this.updateCheck = !this.updateCheck;
    //console.log(this.updateCheck);
  }

  

  // updateArrayWithPayload(b_id, payload) {
  //   this.bServe.putBusiness(b_id, payload).subscribe({
  //     next: (response) => {
  //       console.log('PUT request successful:', response);
  //       // Handle success response here

  //     },
  //     error: (error) => {
  //       console.error('Error in PUT request:', error);
  //       // Handle error here
  //     }
  //   });
  // }

  async updateArrayWithPayload(b_id, payload) {
    try {
      console.log('BID in UPDATEARRAY ' + payload.b_active)
      let response = await this.uProfService.putBusUpdate(b_id, payload);
      
      if (response.acknowledged) {
        //console.log("UPDATE RESPONSE: " + JSON.stringify(response))
        await this.getBusinessProfile();
  
      }
      this.updateCheck = false;

    } catch (error) {
      console.log(error)
    }
  }

}
