import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '../../../app-services/userProfile.service';
import { DashboardComponent } from '../../dashboard.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { ImageService } from '../../../app-services';

@Component({
  selector: 'app-du-profile',
  standalone: true,
  imports: [FormsModule, 
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatButtonModule,
            DashboardComponent,
            RouterModule,
            LoadingComponent
            ],
  templateUrl: './du-profile.component.html',
  styleUrl: './du-profile.component.css'
})
export class DuProfileComponent implements OnInit {
  @Input() Profile;
  updateCheck = false;
  u_name: string = "";
  userInfo: any;
  profileForm: FormGroup<any>;
  isLoading: boolean = false;
  userPicData: any = [];
  //  = new FormGroup({
    // firstName: new FormControl(''),
    // lastName: new FormControl(''),})

  //user = [{"_id":"6561ac9c66bff91aa86f2443","u_id":{"$numberInt":"1135"},"u_phone":"5555555555","u_email":"ab@lincoln.com","u_street":"555 Fifth Ave","u_city":"Five Town","u_state":"Utah","u_country":"United States","u_zip":"84084","u_username":"Tester","u_fname":"Abraham","u_lname":"Lincoln","u_priv":"1","u_pass":"$2b$10$iKZKrn4opjVfRF7TvnFTiOQxf9ILArSrSyhUPpZ8e3o9/rrxDBDP."}]
  user: any;
  constructor(private formBuilder: FormBuilder,
              private uProfService: UserProfileService,
              private imgService: ImageService,
              private dash: DashboardComponent,
              private r: ActivatedRoute,

    ) {};

  async ngOnInit() {
    this.isLoading = true;
    this.r.parent.params.subscribe(params => {
      this.u_name = params['clientUsername']
      //console.log("DUPROFILE PARAMS? " + params['clientUsername'])
      //console.log(this.u_name)
    });
    // this.u_name = this.r.params['clientUsername'];
    await this.showUserData();
    this.getUserPic(this.user.u_id);
    this.initializeForm();
    this.populateFormData();
    // this.subscribeToFormChanges();
    // this.r.params.subscribe(params => {
    //   this.u_name = params['clientUsername']
    //   this.loadUserProfile();
    // });

  }

  async getUserPic(u_id: number) {
    this.userPicData = await this.imgService.getUserProfileImage(u_id);
    console.log("UserPic Data: " + this.userPicData); 
    // Logging keys (properties) of the object
     console.log("Properties of userPicData:", Object.keys(this.userPicData.u_id));

  }

   changeUserPic(event: any) {
    const file = event.target.files[0];
    // console.log(event.target.files[0]);
    const squoosher = this.imgService.squooshIt(file);
     
  }

  updateSwitch() {
    this.updateCheck = !this.updateCheck;
    //console.log(this.updateCheck);
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.user && this.user.length > 0 ? this.user.u_fname : '', Validators.required],
      lastName: [this.user && this.user.length > 0 ? this.user.u_lname : '', Validators.required],
      u_email: [this.user && this.user.length > 0 ? this.user.u_email : '', Validators.email],
      u_phone: [this.user && this.user.length > 0 ? this.user.u_phone : ''],
      u_username: [this.user && this.user.length > 0 ? this.user.u_username : '', Validators.required],
      u_street: [this.user && this.user.length > 0 ? this.user.u_street : ''],
      u_city: [this.user && this.user.length > 0 ? this.user.u_city : ''],
      u_state: [this.user && this.user.length > 0 ? this.user.u_state : ''],
      u_zip: [this.user && this.user.length > 0 ? this.user.u_zip : '']
    });
  }
  

  populateFormData() {
    console.log(this.user + " " + this.user.length)
    if (this.user) {
      const userData = this.user; // Access the first element of the user array
      
      this.profileForm.patchValue({
        firstName: userData.u_fname || '',
        lastName: userData.u_lname || '',
        u_email: userData.u_email || '',
        u_phone: userData.u_phone || '',
        u_username: userData.u_username || '',
        u_street: userData.u_street || '',
        u_city: userData.u_city || '',
        u_state: userData.u_state || '',
        u_zip: userData.u_zip || ''
      });
    } else {
      console.log('Something went wrong with FormData')
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
      u_zip: this.profileForm.value.u_zip,
      u_phone: this.profileForm.value.u_phone
      // Add other fields as needed
  };
  //console.log(`Payload for ${this.user.u_id}: `, payload);
  // Call your method to update the array with the payload
  this.updateArrayWithPayload(this.user.u_id, payload);
}

async updateArrayWithPayload(u_id, payload) {
  try {
    let response = await this.uProfService.putUserUpdate(u_id, payload);
    if (response) {
      console.log("UPDATE RESPONSE: " + JSON.stringify(response))
      this.showUserData();
      this.updateCheck = !this.updateCheck;

    }
  } catch (error) {
    console.log(error)
  }
}

async loadUserProfile() {
  // Fetch client profile
  this.Profile = await this.uProfService.getUsername(this.u_name);
  //console.log('Profile: ' + this.Profile)
}

async showUserData() {
  try {
    let response = await this.uProfService.getUsername(this.u_name);
    if (response) {
      if (Array.isArray(response)) {
        this.user = response; // If response is already an array, assign it directly
      } else {
        // If response is not an array, try to parse it
        this.user = (response);
        console.log(this.user)
      }
      this.isLoading = false;
    } else {
      console.log('No response for showUserData');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    this.isLoading = false;
  }
}

// async showUserData() {
//   // console.log(this.u_name);
//   let response = await this.uProfService.getUsername(this.u_name)
//   if (response) {
//     // response = JSON.stringify(response);
//     console.log('Response: ' + typeof response);
//     this.user = response;
//    // console.log("duProfile: " + this.user);
//     this.isLoading = false;
//   } else {
//     console.log('No response for showUserData')
//   }
// }

}
