import { Component, OnInit } from '@angular/core';
import { BusinessProfileImagesComponent } from './business-profile-images/business-profile-images.component';
import { BusinessProfileMenuComponent } from './business-profile-menu/business-profile-menu.component';
import { BusinessProfileUserComponent } from './business-profile-user/business-profile-user.component';
import { BusinessProfileReviewsComponent } from './business-profile-reviews/business-profile-reviews.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { ActivatedRoute, RouterModule, Params } from '@angular/router';
import { LoadingComponent } from '../../features/loading/loading.component';
import { CalendarComponent } from '../../commonelements/calendar/calendar.component';

import { BusinessService } from '../../app-services';
import { ImageService } from '../../app-services';
import { ServiceService } from '../../app-services';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [BusinessProfileImagesComponent, BusinessProfileMenuComponent, BusinessProfileUserComponent,
      BusinessProfileReviewsComponent, MatExpansionModule, MatTabsModule, RouterModule, LoadingComponent,
      CalendarComponent,  MatButtonToggleModule],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.css'
})
export class BusinessProfileComponent implements OnInit{
  b_id: string = '';
  bData: any;
  isLoading: Boolean = true;
  profileImages: any;
  services: any;
  servComplete: any = [];
  favorited: Boolean = false;

  constructor(private aroute: ActivatedRoute,
              private bServe: BusinessService,
              private iServe: ImageService,
              private sServe: ServiceService
    ) {}

  async ngOnInit() {
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

  // async fetchExtractServices() {
  //   const servicesData = await this.sServe.fetchServices();
  //   for (let service of this.services; let i ++ 1) {
  //     //For each s_id search servicesData, create new entry in servComplete array
      
  //   }

  // }

  async fetchExtractServices() {
    const servicesData = await this.sServe.fetchServices().toPromise();
    //console.log('ServiceData: ' + JSON.stringify(servicesData))
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
}
  
