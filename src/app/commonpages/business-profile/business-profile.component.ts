import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessProfileImagesComponent } from './business-profile-images/business-profile-images.component';
import { BusinessProfileMenuComponent } from './business-profile-menu/business-profile-menu.component';
import { BusinessProfileUserComponent } from './business-profile-user/business-profile-user.component';
import { BusinessProfileReviewsComponent } from './business-profile-reviews/business-profile-reviews.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, RouterModule, Params } from '@angular/router';
import { LoadingComponent } from '../../features/loading/loading.component';
import { CalendarComponent } from '../../commonelements/calendar/calendar.component';

import { AppointmentService, BusinessService, UserService } from '../../app-services';
import { ImageService } from '../../app-services';
import { ServiceService } from '../../app-services';
import { AuthStore } from '../../app-services/auth/auth.store';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [BusinessProfileImagesComponent, BusinessProfileMenuComponent, BusinessProfileUserComponent,
      BusinessProfileReviewsComponent, MatExpansionModule, MatTabsModule, MatIcon, MatCardModule, RouterModule, LoadingComponent,
      CalendarComponent, MatButtonModule, MatDatepickerModule, MatButtonToggleModule,MatSelectModule, MatInputModule, ReactiveFormsModule, CommonModule, MatFormFieldModule],
  templateUrl: './business-profile.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './business-profile.component.css'
})
export class BusinessProfileComponent implements OnInit{
  b_id: string = '';
  bData: any;
  isLoading: Boolean = true;
  profileImages: any;
  allServices: any;
  services: any;
  servComplete: any = [];
  favorited: Boolean = false;
  dateSelected: Date | null;
  
  // ============================ Appointments ================================
  formDate = new FormControl('');
  formService = new FormControl('');
  formHour = new FormControl('');
  
  availableHours = [9,10,11,12,13,14,15,16,17];
  selectedHour: number;
  selected: Date | null;
  selectedSID: number;
  username: string;
  userID: number;
  

  constructor(private aroute: ActivatedRoute,
              private bServe: BusinessService,
              private uServe: UserService,
              private iServe: ImageService,
              private sServe: ServiceService,
              private aServe: AppointmentService,
              public auth: AuthStore,
              public fb: FormBuilder
    ) {}

  async ngOnInit() {
    this.checkFavs();
    this.isLoading = true;
    this.b_id = this.aroute.snapshot.paramMap.get('b_id');
    //this.getBusiness(this.b_id);
    this.bServe.fetchBusiness(this.b_id).subscribe((data) => {
      this.bData = data;
      this.services = this.bData.b_services;
      //console.log(this.services);
    });
    this.getBusinessProfileImages(this.b_id);
    
    
    this.fetchExtractServices();
    // console.log(this.profileImages)

  }
  
  async getBusinessProfileImages(b_id: string) {
    this.isLoading = true;
    this.profileImages = await this.iServe.getBusProfileImage(b_id);
    this.isLoading = false;
  };

  async checkFavs() {
    const data = localStorage.getItem("fav_bus_list");
    const fav_list = data ? JSON.parse(data) : null;
    //const fav_list = currentdata['fav_bus'];
    const businessID = this.aroute.snapshot.paramMap.get('b_id');
    //console.log('FavList: ' + fav_list + " " + 'B_ID: ' + " " + businessID ); 

    if (fav_list.includes(businessID)) {
      this.favorited = true;
    } else {
      this.favorited = false;
    }

  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  async fetchExtractServices() {
    this.allServices = await this.sServe.fetchServices().toPromise();
    //console.log('ServiceData: ' + JSON.stringify(this.allServices))
     
    for (let service of this.services) {
        let foundService = await this.sServe.fetchSID(service); 
        //foundService = JSON.stringify(foundService)

        //console.log("FoundService" + foundService);
        if (foundService) {
          this.servComplete.push(foundService); // Push s_name to s_names array
        } else {
          this.servComplete.push(null); // Push null if no matching service found
        }
      }
      //console.log(this.servComplete[0])
    }

    async favoriteBus() {
      const favBusList = localStorage.getItem("fav_bus_list");
  
      const favBusArray = favBusList ? JSON.parse(favBusList) : [];
  
      const authData = localStorage.getItem("auth_data");
      this.userID = authData ? JSON.parse(authData)['u_id'] : null;
      this.username = authData ? JSON.parse(authData)['u_username'] : null;
      
      const businessID = this.aroute.snapshot.paramMap.get('b_id');
  
      if (this.userID && businessID) {
          const response = await this.uServe.favoriteUpdate(this.userID, businessID);
          
          this.favorited = !this.favorited;
  
          if (this.favorited) {
              if (!favBusArray.includes(businessID)) {
                  favBusArray.push(businessID);
              } else {
              }
          } else {
              const index = favBusArray.indexOf(businessID);
              if (index !== -1) {
                  favBusArray.splice(index, 1);
              } else {
                  console.log('Business not found in favorite list:', businessID);
              }
          }
  
          localStorage.setItem('fav_bus_list', JSON.stringify(favBusArray));
      } else {
          console.log("HOLY CRAP THERE'S AN ERROR");
      }
  }

  //=========================================== Appointments =========================================
  async buildAppointment() {
    const authData = localStorage.getItem("auth_data");
      this.userID = authData ? JSON.parse(authData)['u_id'] : null;
      this.username = authData ? JSON.parse(authData)['u_username'] : null;
    const postComplete = {
      "b_id": this.b_id,
      "u_id": this.userID,
      "u_username": this.username,
      "app_date": this.formDate.value,
      "app_time": this.formHour.value,
      "b_name": this.bData.b_name,
      "s_id": this.formService.value,
    };
    console.log(postComplete)

    const response = await this.aServe.postAppointment(postComplete);
    console.log(response);
    //this.b_id is set earlier
    //this.selected is the date
    //this.selectedSID is set by setAppointmentFunction
    //this.username will be set in lines 136+- 
    //this.u_id set and found in line 136
  }

  setAppointmentService(s_id) {
    this.selectedSID = s_id;
    //console.log(s_id)
    this.formService.setValue(s_id);
  }

  setDate(date) {
    //console.log(date)
    //console.log(this.selected)
    this.formDate.setValue(date);
    this.formHour.setValue('');
  }

  onHourSelected(hour, date) {
    console.log(hour);
    console.log(date);
    date.setHours(hour);
    this.formDate.setValue(date);
  }
   
}
  
